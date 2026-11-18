export type ShowAvailability = "available" | "filling-fast" | "sold-out";

export type Show = {
  id: string;
  movieId: string;
  theatreId: string;
  /** ISO date-time. */
  startsAt: string;
  /** Lowest ticket price in rupees. */
  priceFrom: number;
  availability: ShowAvailability;
  screen: number;
};
