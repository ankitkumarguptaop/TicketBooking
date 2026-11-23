import { currentUserUpdated, type User } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";

import type { ProfileValues } from "../model/profile-schema";

const updateProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // PATCH returns the updated user, so we write it into the getMe cache
    // instead of refetching. The session slice picks it up from there.
    updateProfile: build.mutation<User, ProfileValues>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      async onQueryStarted(_values, { dispatch, queryFulfilled }) {
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

export const { useUpdateProfileMutation } = updateProfileApi;
