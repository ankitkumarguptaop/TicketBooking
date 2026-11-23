export type UserRole = "USER" | "ADMIN";

/** The signed-in user: GET/PATCH /users/me and POST /auth/login. */
export type User = {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  /** ISO date. */
  createdAt: string;
  /** Proved with a code sent to the email / phone. */
  emailVerified: boolean;
  phoneVerified: boolean;
};

/**
 * unknown: not confirmed yet (page just loaded).
 * authenticated: the API confirmed the user.
 * anonymous: the API said no, or the user signed out.
 */
export type SessionStatus = "unknown" | "authenticated" | "anonymous";

export type NotificationPreferences = {
  bookingUpdates: boolean;
  showReminders: boolean;
  offers: boolean;
};

export type NotificationPreferenceKey = keyof NotificationPreferences;

/**
 * A device signed in to this account (GET /auth/sessions).
 * Not the same as the auth `session` slice.
 */
export type LoginSession = {
  id: string;
  /** Label sent at login, if any. */
  deviceName: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  /** ISO dates. */
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
  /** True for the session making the request, i.e. this browser. */
  current: boolean;
};
