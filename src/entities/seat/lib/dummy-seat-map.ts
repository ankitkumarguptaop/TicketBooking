import type { Seat, SeatSectionLayout, SeatStatus, SeatTier } from "../model/types";

type TierSpec = {
  tier: SeatTier;
  label: string;
  price: number;
  rows: string[];
};

// Layout from the Figma "03 Seat selection" screen (there is no row I).
const tiers: TierSpec[] = [
  { tier: "recliner", label: "Recliner", price: 420, rows: ["A", "B"] },
  { tier: "premium", label: "Premium", price: 280, rows: ["C", "D", "E", "F"] },
  { tier: "regular", label: "Regular", price: 200, rows: ["G", "H", "J", "K"] },
];

const seatsPerRow = 16;

export const dummyAisleAfter = [4, 12];

/** Shows as available, but the dummy hold API always rejects it, to demo the conflict message. */
export const demoContestedSeatId = "H9";

function stableHash(value: string): number {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function fakeStatus(showId: string, seatId: string): SeatStatus {
  if (seatId === demoContestedSeatId) return "available";
  const bucket = stableHash(`${showId}:${seatId}`) % 10;
  if (bucket <= 1) return "booked";
  if (bucket === 2) return "held";
  return "available";
}

export function buildDummySeatMap(showId: string) {
  const seats: Seat[] = [];
  const sections: SeatSectionLayout[] = tiers.map(({ tier, label, price, rows }) => ({
    tier,
    label,
    price,
    rows: rows.map((row) => {
      const rowSeats = Array.from({ length: seatsPerRow }, (_, offset) => {
        const number = offset + 1;
        const id = `${row}${number}`;
        seats.push({ id, row, number, tier, price, status: fakeStatus(showId, id) });
        return { id, number };
      });
      return { label: row, seats: rowSeats };
    }),
  }));

  return { sections, seats };
}
