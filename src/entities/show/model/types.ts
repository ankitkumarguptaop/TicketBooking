export type ShowAvailability = "available" | "filling-fast" | "sold-out";

export type Show = {
  id: string;
  movieId: string;
  movieTitle: string;
  theatreId: string;
  theatreName: string;
  screenId: string;
  /** e.g. "Screen 2" or "Audi 1". */
  screenName: string;
  city: string;
  /** ISO date-time. */
  startsAt: string;
  /** Lowest ticket price in rupees. */
  priceFrom: number;
  availability: ShowAvailability;
};
