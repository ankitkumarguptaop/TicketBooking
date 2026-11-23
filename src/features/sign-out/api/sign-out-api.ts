import { baseApi } from "@/shared/api/base-api";

const signOutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Ends this device's session and clears both httpOnly cookies. Always 204.
    signOut: build.mutation<null, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
  }),
});

export const { useSignOutMutation } = signOutApi;
