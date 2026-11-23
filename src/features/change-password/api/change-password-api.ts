import { baseApi } from "@/shared/api/base-api";

type CodeSent = {
  /** ISO date: when "Resend code" unlocks. */
  resendAvailableAt: string;
};

type ChangePasswordRequest = {
  code: string;
  newPassword: string;
};

const changePasswordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Goes to the signed-in account's own email.
    sendChangePasswordCode: build.mutation<CodeSent, void>({
      query: () => ({ url: "/users/me/password/code", method: "POST" }),
    }),
    // Every OTHER device is signed out: refresh the "Active sessions" list.
    changePassword: build.mutation<void, ChangePasswordRequest>({
      query: (body) => ({ url: "/users/me/password", method: "POST", body }),
      invalidatesTags: ["LoginSession"],
    }),
  }),
});

export const { useSendChangePasswordCodeMutation, useChangePasswordMutation } = changePasswordApi;
