import {
  fetchBaseQuery,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { env } from "@/shared/config/env";

import { getErrorCode } from "./get-error-message";
import { sessionExpired } from "./session-expired";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiUrl,
  // Auth lives in httpOnly cookies set by the API; JS never sees the tokens.
  credentials: "include",
});

/**
 * 401 codes worth one refresh. INVALID is included on purpose: if the refresh
 * also fails, the API clears both cookies, so the proxy stops treating this
 * browser as signed in (otherwise a bad cookie could bounce between /login and /).
 */
const refreshableCodes = new Set(["AUTH_TOKEN_EXPIRED", "AUTH_TOKEN_MISSING", "AUTH_TOKEN_INVALID"]);

/** A 401 from these is final: refreshing would loop or make no sense. */
const noRefreshUrls = new Set(["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"]);

/** The refresh in flight in this tab. Every parallel 401 waits on the same one. */
let refreshing: Promise<boolean> | null = null;

function urlOf(args: string | FetchArgs): string {
  return typeof args === "string" ? args : args.url;
}

async function refreshSession(api: BaseQueryApi, extraOptions: object): Promise<boolean> {
  const run = async () => {
    const result = await rawBaseQuery({ url: "/auth/refresh", method: "POST" }, api, extraOptions);
    return !result.error;
  };
  // The lock is shared by every tab of this site, so two tabs never rotate the
  // same refresh token at once (the API would treat the second as token reuse).
  return typeof navigator !== "undefined" && navigator.locks
    ? navigator.locks.request("auth-refresh", run)
    : run();
}

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const error = result.error;
  const canRefresh =
    error?.status === 401 && refreshableCodes.has(getErrorCode(error) ?? "") && !noRefreshUrls.has(urlOf(args));
  if (!canRefresh) return result;

  refreshing ??= refreshSession(api, extraOptions).finally(() => {
    refreshing = null;
  });

  // Retry once. A failed refresh is never retried: the session is over.
  if (await refreshing) return rawBaseQuery(args, api, extraOptions);

  api.dispatch(sessionExpired());
  return result;
};
