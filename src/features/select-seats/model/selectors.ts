import { createSelector } from "@reduxjs/toolkit";

import { selectSeatMap, type Seat } from "@/entities/seat";

import { convenienceFeeRate } from "./booking-rules";

const noSeats: string[] = [];

export const selectSelectedSeatIds = (state: RootState, showId: string) =>
  state.selectedSeats.showId === showId ? state.selectedSeats.seatIds : noSeats;

export const selectIsSeatSelected = (state: RootState, showId: string, seatId: string) =>
  selectSelectedSeatIds(state, showId).includes(seatId);

export type SummaryLine = {
  label: string;
  seatLabels: string;
  amount: number;
};

export type BookingSummary = {
  lines: SummaryLine[];
  seatCount: number;
  subtotal: number;
  fee: number;
  total: number;
};

const tierLabel: Record<Seat["tier"], string> = {
  recliner: "Recliner",
  premium: "Premium",
  regular: "Regular",
};

export const selectBookingSummary = createSelector(
  [selectSeatMap, selectSelectedSeatIds],
  (seatMap, seatIds): BookingSummary => {
    const seats = seatIds
      .map((id) => seatMap?.seats.entities[id])
      .filter((seat): seat is Seat => seat !== undefined)
      .sort((a, b) => a.row.localeCompare(b.row) || a.number - b.number);

    const lines = (["recliner", "premium", "regular"] as const)
      .map((tier) => seats.filter((seat) => seat.tier === tier))
      .filter((tierSeats) => tierSeats.length > 0)
      .map((tierSeats) => ({
        label: tierLabel[tierSeats[0].tier],
        seatLabels: tierSeats.map((seat) => seat.label).join(", "),
        amount: tierSeats.reduce((sum, seat) => sum + seat.price, 0),
      }));

    const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
    const fee = Math.round(subtotal * convenienceFeeRate);

    return { lines, seatCount: seats.length, subtotal, fee, total: subtotal + fee };
  },
);
