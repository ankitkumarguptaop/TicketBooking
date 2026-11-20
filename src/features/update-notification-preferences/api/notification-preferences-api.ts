import { notificationPreferenceChanged, type NotificationPreferenceKey } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";

type UpdatePreferenceRequest = {
  key: NotificationPreferenceKey;
  enabled: boolean;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const notificationPreferencesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Dummy implementation. With the real API this becomes PATCH /me/notification-preferences.
    updateNotificationPreference: build.mutation<null, UpdatePreferenceRequest>({
      queryFn: async () => {
        await wait(250);
        return { data: null };
      },
      // Optimistic: flip the switch in the cache now, put it back if the request fails.
      async onQueryStarted({ key, enabled }, { dispatch, queryFulfilled }) {
        const patch = dispatch(notificationPreferenceChanged(key, enabled));
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
  }),
});

export const { useUpdateNotificationPreferenceMutation } = notificationPreferencesApi;
