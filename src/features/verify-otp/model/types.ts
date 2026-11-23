/** URL segment of .../verification/:channel. */
export type VerificationChannel = "email" | "phone";

/**
 * Which endpoints a form talks to:
 *  - "registration": during sign-up, before any session (verification cookie)
 *  - "account": a signed-in user, e.g. verifying the phone later from the profile
 */
export type VerificationScope = "registration" | "account";

/** Answer of POST .../verification/:channel/send. */
export type CodeSent = {
  /** Masked, e.g. "an***@example.com". */
  sentTo: string;
  /** ISO dates. */
  expiresAt: string;
  resendAvailableAt: string;
};

/** Answer of GET /auth/verification/status (and of a registration confirm). */
export type VerificationStatus = {
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
};
