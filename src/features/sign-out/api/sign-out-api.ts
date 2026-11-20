import { baseApi } from "@/shared/api/base-api";

const signOutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Dummy implementation. With the real API this becomes POST /auth/logout,
    // which clears the httpOnly session cookie.
    signOut: build.mutation<null, void>({
      queryFn: async () => ({ data: null }),
    }),
  }),
});

export const { useSignOutMutation } = signOutApi;
