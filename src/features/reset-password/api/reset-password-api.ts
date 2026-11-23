import { baseApi } from "@/shared/api/base-api";

type ResetRequested = {
  /** ISO date: when "Resend code" unlocks. */
  resendAvailableAt: string;
};

type ConfirmResetRequest = {
  email: string;
  code: string;
  newPassword: string;
};

const resetPasswordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Same answer for every email, registered or not.
    requestPasswordReset: build.mutation<ResetRequested, string>({
      query: (email) => ({ url: "/auth/password-reset/request", method: "POST", body: { email } }),
    }),
    // 204. Every session of the account is signed out, so no cache to update.
    confirmPasswordReset: build.mutation<void, ConfirmResetRequest>({
      query: (body) => ({ url: "/auth/password-reset/confirm", method: "POST", body }),
    }),
  }),
});

export const { useRequestPasswordResetMutation, useConfirmPasswordResetMutation } = resetPasswordApi;
