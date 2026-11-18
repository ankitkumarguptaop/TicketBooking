import { getReviewsForMovie, ReviewCard } from "@/entities/review";

type Props = {
  movieId: string;
  released: boolean;
};

export async function MovieReviews({ movieId, released }: Props) {
  const reviews = await getReviewsForMovie(movieId, released);

  return (
    <section aria-labelledby="reviews-heading" className="flex flex-col gap-5">
      <h2 id="reviews-heading" className="font-heading text-lg font-bold">
        Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard
                author={review.author}
                rating={review.rating}
                verifiedBooking={review.verifiedBooking}
                text={review.text}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
