import { baseApi } from "@/shared/api/base-api";

const revokeSessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    revokeSession: build.mutation<null, string>({
      query: (sessionId) => ({ url: `/auth/sessions/${encodeURIComponent(sessionId)}`, method: "DELETE" }),
      invalidatesTags: ["LoginSession"],
    }),
    // The API's /auth/logout-all also ends THIS device, so instead we revoke
    // each other session one by one. Tags are invalidated even on failure,
    // so the list always refetches and shows what really happened.
    revokeOtherSessions: build.mutation<null, string[]>({
      async queryFn(otherSessionIds, _api, _extraOptions, baseQuery) {
        const results = await Promise.all(
          otherSessionIds.map((id) => baseQuery({ url: `/auth/sessions/${encodeURIComponent(id)}`, method: "DELETE" })),
        );
        const failed = results.find((result) => result.error);
        return failed?.error ? { error: failed.error } : { data: null };
      },
      invalidatesTags: ["LoginSession"],
    }),
  }),
});

export const { useRevokeSessionMutation, useRevokeOtherSessionsMutation } = revokeSessionApi;
