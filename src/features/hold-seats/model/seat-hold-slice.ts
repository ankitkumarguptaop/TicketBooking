import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SeatHoldState = {
  showId: string | null;
  /** Epoch milliseconds. Set by the first successful hold; later seats don't extend it. */
  heldUntil: number | null;
  error: string | null;
};

const initialState: SeatHoldState = {
  showId: null,
  heldUntil: null,
  error: null,
};

export const seatHoldSlice = createSlice({
  name: "seatHold",
  initialState,
  reducers: {
    holdConfirmed(state, { payload }: PayloadAction<{ showId: string; heldUntil: number }>) {
      if (state.showId !== payload.showId || state.heldUntil === null) {
        state.showId = payload.showId;
        state.heldUntil = payload.heldUntil;
      }
      state.error = null;
    },
    holdRejected(state, { payload }: PayloadAction<{ showId: string; message: string }>) {
      state.showId = payload.showId;
      state.error = payload.message;
    },
    holdReleased(state) {
      state.heldUntil = null;
    },
    holdExpired(state) {
      state.heldUntil = null;
      state.error = "Your hold expired. Pick your seats again.";
    },
  },
});

export const { holdConfirmed, holdRejected, holdReleased, holdExpired } = seatHoldSlice.actions;

export const selectHoldDeadline = (state: RootState, showId: string) =>
  state.seatHold.showId === showId ? state.seatHold.heldUntil : null;

export const selectHoldError = (state: RootState, showId: string) =>
  state.seatHold.showId === showId ? state.seatHold.error : null;
