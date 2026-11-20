export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type UserProfile = User & {
  city: string;
  emailVerified: boolean;
  /** ISO date. */
  passwordChangedAt: string;
  stats: {
    bookings: number;
    reviews: number;
    memberSince: number;
  };
};

export type NotificationPreferences = {
  bookingUpdates: boolean;
  showReminders: boolean;
  offers: boolean;
};

export type NotificationPreferenceKey = keyof NotificationPreferences;

/** A device signed in to this account. Not the same as the auth `session` slice. */
export type LoginSession = {
  id: string;
  device: string;
  city: string;
  /** ISO date. */
  lastActiveAt: string;
  isCurrent: boolean;
};
