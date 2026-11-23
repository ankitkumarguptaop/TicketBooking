import { createAction } from "@reduxjs/toolkit";

/**
 * Dispatched by the base query when a refresh fails: the session is over.
 * It lives in shared because shared can't import from entities; the
 * session slice in entities/user listens for it.
 */
export const sessionExpired = createAction("auth/sessionExpired");
