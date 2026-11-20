import type { LoginSession, NotificationPreferences, UserProfile } from "../model/types";

const dayMs = 24 * 60 * 60 * 1000;

export function buildDummyProfile(now: number): UserProfile {
  return {
    id: "usr_ankit",
    name: "Ankit Kumar",
    email: "ankit@example.com",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    emailVerified: true,
    passwordChangedAt: new Date(now - 92 * dayMs).toISOString(),
    stats: { bookings: 14, reviews: 6, memberSince: 2025 },
  };
}

export const dummyNotificationPreferences: NotificationPreferences = {
  bookingUpdates: true,
  showReminders: true,
  offers: false,
};

export function buildDummyLoginSessions(now: number): LoginSession[] {
  return [
    { id: "ses_chrome", device: "Chrome on Windows", city: "Bengaluru", lastActiveAt: new Date(now).toISOString(), isCurrent: true },
    { id: "ses_safari", device: "Safari on iPhone", city: "Bengaluru", lastActiveAt: new Date(now - 2 * dayMs).toISOString(), isCurrent: false },
  ];
}
