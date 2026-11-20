import { baseApi } from "@/shared/api/base-api";

import { buildDummyLoginSessions, buildDummyProfile, dummyNotificationPreferences } from "../lib/dummy-profile";
import type { LoginSession, NotificationPreferenceKey, NotificationPreferences, UserProfile } from "../model/types";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Dummy data for now. With the real API these become queries to
    // /me, /me/notification-preferences and /me/sessions.
    getProfile: build.query<UserProfile, void>({
      queryFn: async () => ({ data: buildDummyProfile(Date.now()) }),
      providesTags: ["User"],
    }),
    getNotificationPreferences: build.query<NotificationPreferences, void>({
      queryFn: async () => ({ data: dummyNotificationPreferences }),
      providesTags: ["NotificationPreferences"],
    }),
    getLoginSessions: build.query<LoginSession[], void>({
      queryFn: async () => ({ data: buildDummyLoginSessions(Date.now()) }),
      providesTags: ["LoginSession"],
    }),
  }),
});

export const { useGetProfileQuery, useGetNotificationPreferencesQuery, useGetLoginSessionsQuery } = profileApi;

// Cache updaters for the feature mutations. They write the server's answer straight
// into the cache instead of refetching (and, while the data is dummy, a refetch
// would bring the old values back).

export const profileUpdated = (profile: UserProfile) =>
  profileApi.util.upsertQueryData("getProfile", undefined, profile);

export const notificationPreferenceChanged = (key: NotificationPreferenceKey, enabled: boolean) =>
  profileApi.util.updateQueryData("getNotificationPreferences", undefined, (draft) => {
    draft[key] = enabled;
  });

export const loginSessionsRemoved = (sessionIds: string[]) =>
  profileApi.util.updateQueryData("getLoginSessions", undefined, (draft) =>
    draft.filter((session) => !sessionIds.includes(session.id)),
  );
