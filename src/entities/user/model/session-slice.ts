import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { sessionExpired } from "@/shared/api/session-expired";

import { userApi } from "../api/user-api";
import type { SessionEndReason, SessionStatus, User } from "./types";

type SessionState = {
  user: User | null;
  status: SessionStatus;
  /** Why the session ended; null while signed in or not known yet. */
  endReason: SessionEndReason | null;
};

const initialState: SessionState = {
  user: null,
  status: "unknown",
  endReason: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sessionStarted(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "authenticated";
      state.endReason = null;
    },
    sessionEnded(state) {
      state.user = null;
      state.status = "anonymous";
      state.endReason = "signed-out";
    },
    /** The copy from localStorage. Ignored if the API already answered. */
    savedUserLoaded(state, action: PayloadAction<User | null>) {
      if (state.status === "unknown" && !state.user) state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
        state.endReason = null;
      })
      // A 401 that survived the refresh attempt: definitely signed out.
      // Other errors (offline, 500) leave the status unknown on purpose.
      .addMatcher(userApi.endpoints.getMe.matchRejected, (state, action) => {
        if (action.payload?.status === 401) {
          if (state.status !== "anonymous") state.endReason = "expired";
          state.user = null;
          state.status = "anonymous";
        }
      })
      // Includes "signed out from another device": the API rejects the session.
      .addMatcher(sessionExpired.match, (state) => {
        // Keep "signed-out" if this tab already signed out on purpose.
        if (state.status !== "anonymous") state.endReason = "expired";
        state.user = null;
        state.status = "anonymous";
      });
  },
});

export const { sessionStarted, sessionEnded, savedUserLoaded } = sessionSlice.actions;
