import { baseApi } from "@/shared/api/base-api";
import { env } from "@/shared/config/env";

/** Wait before reopening a stream the API rejected (e.g. access token expired). */
const reconnectDelayMs = 5_000;

const sessionEventsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sessionEvents: build.query<null, void>({
      queryFn: () => ({ data: null }),
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(_arg, { dispatch, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;

        let source: EventSource | null = null;
        let retryTimer: ReturnType<typeof setTimeout> | undefined;
        const recheckSession = () => dispatch(baseApi.util.invalidateTags(["User"]));
        // A function, so TypeScript reads `source` at call time (not narrowed to null).
        const closeStream = () => source?.close();

        const connect = () => {
          source = new EventSource(`${env.apiUrl}/auth/sessions/events`, { withCredentials: true });
          source.addEventListener("session-revoked", () => {
            closeStream();
            recheckSession();
          });
          source.addEventListener("error", () => {
            // CONNECTING means the browser is already retrying (network blip).
            // CLOSED means the API refused us (401): either the access token
            // expired, which getMe's refresh fixes, or the session is over,
            // which getMe turns into a sign-out.
            if (source?.readyState !== EventSource.CLOSED) return;
            recheckSession();
            retryTimer = setTimeout(connect, reconnectDelayMs);
          });
        };

        connect();
        await cacheEntryRemoved;
        clearTimeout(retryTimer);
        closeStream();
      },
    }),
  }),
});

export const { useSessionEventsQuery } = sessionEventsApi;
