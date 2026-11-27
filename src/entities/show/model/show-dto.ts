/** A show as GET /shows and GET /shows/:id return it. */
export type ShowDto = {
  id: string;
  movieId: string;
  movieTitle: string;
  theatreId: string;
  theatreName: string;
  screenId: string;
  screenName: string;
  city: string;
  startsAt: string;
  endsAt: string;
  status: "SCHEDULED" | "CANCELLED";
  prices: { category: "REGULAR" | "PREMIUM" | "RECLINER"; amountMinor: number; currency: string }[];
};
