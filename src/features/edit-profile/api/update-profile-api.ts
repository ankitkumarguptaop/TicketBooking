import { profileUpdated, type UserProfile } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";

import type { ProfileValues } from "../model/profile-schema";

type UpdateProfileRequest = {
  current: UserProfile;
  values: ProfileValues;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const updateProfileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Dummy implementation. With the real API this becomes PATCH /me with `values`
    // as the body, and the response is the updated profile.
    updateProfile: build.mutation<UserProfile, UpdateProfileRequest>({
      queryFn: async ({ current, values }) => {
        await wait(400);
        return { data: { ...current, ...values } };
      },
      async onQueryStarted(_request, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(profileUpdated(data));
      },
    }),
  }),
});

export const { useUpdateProfileMutation } = updateProfileApi;
