import { currentUserUpdated, type User } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";

import type { CodeSent, VerificationChannel, VerificationScope, VerificationStatus } from "../model/types";

type SendRequest = {
  scope: VerificationScope;
  channel: VerificationChannel;
};

type ConfirmRequest = {
  channel: VerificationChannel;
  code: string;
};

const basePath: Record<VerificationScope, string> = {
  registration: "/auth/verification",
  account: "/users/me/verification",
};

const verifyOtpApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Sign-up only: who is verifying, read from the verification cookie.
    getRegistrationVerificationStatus: build.query<VerificationStatus, void>({
      query: () => "/auth/verification/status",
    }),
    sendVerificationCode: build.mutation<CodeSent, SendRequest>({
      query: ({ scope, channel }) => ({ url: `${basePath[scope]}/${channel}/send`, method: "POST" }),
    }),
    // Answers with the new status. Writing it into the status cache moves
    // the sign-up screen to the next step without another request.
    confirmRegistrationCode: build.mutation<VerificationStatus, ConfirmRequest>({
      query: ({ channel, code }) => ({
        url: `${basePath.registration}/${channel}/confirm`,
        method: "POST",
        body: { code },
      }),
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(verifyOtpApi.util.upsertQueryData("getRegistrationVerificationStatus", undefined, data));
        } catch {
          // The form shows the error from the mutation hook.
        }
      },
    }),
    // Answers with the updated user. Writing it into the getMe cache flips the
    // badge and lets the guard move on, without another request.
    confirmAccountCode: build.mutation<User, ConfirmRequest>({
      query: ({ channel, code }) => ({
        url: `${basePath.account}/${channel}/confirm`,
        method: "POST",
        body: { code },
      }),
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(currentUserUpdated(data));
        } catch {
          // The form shows the error from the mutation hook.
        }
      },
    }),
  }),
});

export const {
  useGetRegistrationVerificationStatusQuery,
  useSendVerificationCodeMutation,
  useConfirmRegistrationCodeMutation,
  useConfirmAccountCodeMutation,
} = verifyOtpApi;
