import { reviewTemplates } from "../lib/dummy-reviews";
import type { Review } from "../model/types";

/** Dummy implementation. Pass `released: false` for coming-soon movies, which have no reviews. */
export async function getReviewsForMovie(movieId: string, released: boolean): Promise<Review[]> {
  if (!released) return [];

  return reviewTemplates.map((template, position) => ({
    ...template,
    id: `${movieId}-review-${position + 1}`,
    movieId,
    verifiedBooking: true,
  }));
}
