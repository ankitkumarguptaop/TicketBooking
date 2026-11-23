import { createListenerMiddleware } from "@reduxjs/toolkit";

import { clearSavedUser, saveUser } from "../lib/saved-user";

/**
 * Mirrors the session slice into localStorage whenever it changes. A listener
 * (not a component effect) so it runs no matter which page dispatched, e.g.
 * sign-out right before navigating away.
 */
export const sessionPersistence = createListenerMiddleware();

sessionPersistence.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, current, previous) => current.session !== previous.session,
  effect: (_action, api) => {
    const { user, status } = api.getState().session;
    if (user) saveUser(user);
    // Only clear once the API said no; "unknown" may still turn out signed in.
    else if (status === "anonymous") clearSavedUser();
  },
});
