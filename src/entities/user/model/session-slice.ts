import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "./types";

type SessionState = {
  user: User | null;
};

const initialState: SessionState = {
  user: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sessionStarted(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    sessionEnded(state) {
      state.user = null;
    },
  },
});

export const { sessionStarted, sessionEnded } = sessionSlice.actions;
