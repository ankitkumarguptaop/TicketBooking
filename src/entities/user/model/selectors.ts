import { hasRequiredVerification } from "../lib/has-required-verification";

export const selectCurrentUser = (state: RootState) => state.session.user;

export const selectSessionStatus = (state: RootState) => state.session.status;

/** The API ended the session (e.g. signed out from another device), not this tab. */
export const selectSessionEndedRemotely = (state: RootState) =>
  state.session.status === "anonymous" && state.session.endReason === "expired";

export const selectIsAuthenticated = (state: RootState) => state.session.user !== null;

/**
 * Signed in (confirmed by the API, not just the saved copy) but a REQUIRED
 * contact isn't verified yet (see hasRequiredVerification). Returns a
 * boolean, so components re-render only when the answer flips.
 */
export const selectNeedsVerification = (state: RootState) =>
  state.session.status === "authenticated" && state.session.user !== null && !hasRequiredVerification(state.session.user);
