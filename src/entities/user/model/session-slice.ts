import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { sessionExpired } from "@/shared/api/session-expired";

import { userApi } from "../api/user-api";
import type { SessionStatus, User } from "./types";

type SessionState = {
  user: User | null;
  status: SessionStatus;
};

const initialState: SessionState = {
  user: null,
  status: "unknown",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sessionStarted(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    sessionEnded(state) {
      state.user = null;
      state.status = "anonymous";
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
      })
      // A 401 that survived the refresh attempt: definitely signed out.
      // Other errors (offline, 500) leave the status unknown on purpose.
      .addMatcher(userApi.endpoints.getMe.matchRejected, (state, action) => {
        if (action.payload?.status === 401) {
          state.user = null;
          state.status = "anonymous";
        }
      })
      .addMatcher(sessionExpired.match, (state) => {
        state.user = null;
        state.status = "anonymous";
      });
  },
});

export const { sessionStarted, sessionEnded, savedUserLoaded } = sessionSlice.actions;
