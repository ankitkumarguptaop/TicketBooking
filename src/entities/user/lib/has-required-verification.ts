import type { User } from "../model/types";

/**
 * What a user must prove before using the app. For now that's the email
 * only; phone verification is optional (offered, can be skipped).
 * Make it `user.emailVerified && user.phoneVerified` to require both again.
 */
export function hasRequiredVerification(user: Pick<User, "emailVerified">): boolean {
  return user.emailVerified;
}
