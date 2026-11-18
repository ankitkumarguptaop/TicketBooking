import type { EntityState } from "@reduxjs/toolkit";

export type SeatTier = "recliner" | "premium" | "regular";

export type SeatStatus = "available" | "held" | "booked";

export type Seat = {
  /** Row letter + number, e.g. "H6". */
  id: string;
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  status: SeatStatus;
};

export type SeatRowLayout = {
  label: string;
  seats: { id: string; number: number }[];
};

export type SeatSectionLayout = {
  tier: SeatTier;
  label: string;
  price: number;
  rows: SeatRowLayout[];
};

export type SeatMap = {
  sections: SeatSectionLayout[];
  /** Seat numbers followed by an aisle, e.g. [4, 12]. */
  aisleAfter: number[];
  seats: EntityState<Seat, string>;
};
