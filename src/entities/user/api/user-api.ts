import { baseApi } from "@/shared/api/base-api";

import { dummyNotificationPreferences } from "../lib/dummy-notification-preferences";
import type { LoginSession, NotificationPreferenceKey, NotificationPreferences, User } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** The signed-in user. A 401 here just means "not signed in". */
    getMe: build.query<User, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    getLoginSessions: build.query<LoginSession[], void>({
      query: () => "/auth/sessions",
      providesTags: ["LoginSession"],
    }),
    // Still dummy: the API has no notification-preferences endpoint yet.
    getNotificationPreferences: build.query<NotificationPreferences, void>({
      queryFn: async () => ({ data: dummyNotificationPreferences }),
      providesTags: ["NotificationPreferences"],
    }),
  }),
});

export const { useGetMeQuery, useGetNotificationPreferencesQuery, useGetLoginSessionsQuery } = userApi;

/** Writes a fresh user (e.g. the PATCH response) into the getMe cache, no refetch needed. */
export const currentUserUpdated = (user: User) => userApi.util.upsertQueryData("getMe", undefined, user);

// The dummy preferences can't be refetched (they'd come back unchanged), so the
// toggle writes its answer straight into the cache.
export const notificationPreferenceChanged = (key: NotificationPreferenceKey, enabled: boolean) =>
  userApi.util.updateQueryData("getNotificationPreferences", undefined, (draft) => {
    draft[key] = enabled;
  });
