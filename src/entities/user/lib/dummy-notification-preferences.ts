import type { NotificationPreferences } from "../model/types";

/** Still dummy: the API has no notification-preferences endpoint yet. */
export const dummyNotificationPreferences: NotificationPreferences = {
  bookingUpdates: true,
  showReminders: true,
  offers: false,
};
