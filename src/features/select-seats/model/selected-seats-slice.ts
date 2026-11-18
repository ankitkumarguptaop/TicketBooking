import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SelectedSeatsState = {
  /** The show the selection belongs to. Picking a seat in another show starts over. */
  showId: string | null;
  seatIds: string[];
};

type SeatPayload = {
  showId: string;
  seatId: string;
};

const initialState: SelectedSeatsState = {
  showId: null,
  seatIds: [],
};

export const selectedSeatsSlice = createSlice({
  name: "selectedSeats",
  initialState,
  reducers: {
    seatSelected(state, { payload }: PayloadAction<SeatPayload>) {
      if (state.showId !== payload.showId) {
        state.showId = payload.showId;
        state.seatIds = [];
      }
      if (!state.seatIds.includes(payload.seatId)) {
        state.seatIds.push(payload.seatId);
      }
    },
    seatDeselected(state, { payload }: PayloadAction<SeatPayload>) {
      if (state.showId === payload.showId) {
        state.seatIds = state.seatIds.filter((id) => id !== payload.seatId);
      }
    },
    selectionCleared(state) {
      state.seatIds = [];
    },
  },
});

export const { seatSelected, seatDeselected, selectionCleared } = selectedSeatsSlice.actions;
