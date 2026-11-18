type ShowSlot = {
  time: string;
  priceFrom: number;
};

// Daily slots per theatre, from the Figma "02 Movie detail" screen.
export const dummySlotsByTheatre: Record<string, ShowSlot[]> = {
  "pvr-orion": [
    { time: "10:15", priceFrom: 180 },
    { time: "13:30", priceFrom: 220 },
    { time: "16:45", priceFrom: 240 },
    { time: "20:00", priceFrom: 260 },
    { time: "23:10", priceFrom: 220 },
  ],
  "galaxy-indiranagar": [
    { time: "11:00", priceFrom: 160 },
    { time: "14:20", priceFrom: 200 },
    { time: "18:10", priceFrom: 220 },
    { time: "21:30", priceFrom: 240 },
  ],
  "lumiere-koramangala": [
    { time: "12:40", priceFrom: 240 },
    { time: "16:00", priceFrom: 280 },
    { time: "19:20", priceFrom: 320 },
  ],
};

/** Small stable hash, so the same show always gets the same fake availability. */
export function stableHash(value: string): number {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}
