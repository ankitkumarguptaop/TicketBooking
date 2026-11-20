import { loginSessionsRemoved } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";

type RevokeResponse = {
  revokedIds: string[];
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const revokeSessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Dummy implementations. With the real API these become DELETE /me/sessions/:id
    // and DELETE /me/sessions (every session except the current one).
    revokeSession: build.mutation<RevokeResponse, string>({
      queryFn: async (sessionId) => {
        await wait(300);
        return { data: { revokedIds: [sessionId] } };
      },
      async onQueryStarted(_sessionId, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(loginSessionsRemoved(data.revokedIds));
      },
    }),
    revokeOtherSessions: build.mutation<RevokeResponse, string[]>({
      queryFn: async (otherSessionIds) => {
        await wait(300);
        return { data: { revokedIds: otherSessionIds } };
      },
      async onQueryStarted(_ids, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(loginSessionsRemoved(data.revokedIds));
      },
    }),
  }),
});

export const { useRevokeSessionMutation, useRevokeOtherSessionsMutation } = revokeSessionApi;
