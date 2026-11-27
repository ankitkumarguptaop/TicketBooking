import type { EntityState } from "@reduxjs/toolkit";

export type SeatTier = "recliner" | "premium" | "regular";

export type SeatStatus = "available" | "held" | "booked";

export type Seat = {
  id: string;
  /** Row letter + number, e.g. "H6". */
  label: string;
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  status: SeatStatus;
};

export type SeatRowLayout = {
  id: string;
  label: string;
  /** `column` is 1-based and shared by every row, so seats line up and empty columns show as aisles. */
  seats: { id: string; number: number; column: number }[];
};

export type SeatSectionLayout = {
  id: string;
  tier: SeatTier;
  label: string;
  price: number;
  rows: SeatRowLayout[];
};

export type SeatMap = {
  sections: SeatSectionLayout[];
  /** Width of the seat grid in columns, aisles included. */
  columnCount: number;
  seats: EntityState<Seat, string>;
};
