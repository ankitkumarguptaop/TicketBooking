import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getMovieById } from "@/entities/movie";
import { getShowById } from "@/entities/show";
import { getTheatreById } from "@/entities/theatre";
import { Container } from "@/shared/ui/container";
import { BookingHeader } from "@/widgets/booking-header";
import { BookingSummary } from "@/widgets/booking-summary";
import { SeatMap, SeatMapSkeleton } from "@/widgets/seat-map";

export const metadata: Metadata = {
  title: "Choose seats",
};

export default async function ShowPage({ params }: PageProps<"/shows/[showId]">) {
  const show = await getShowById((await params).showId);
  if (!show) notFound();

  const [movie, theatre] = await Promise.all([getMovieById(show.movieId), getTheatreById(show.theatreId)]);
  if (!movie || !theatre) notFound();

  return (
    <>
      <BookingHeader
        showId={show.id}
        movieTitle={movie.title}
        theatreName={theatre.name}
        screen={show.screen}
        startsAt={show.startsAt}
      />
      <Container className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Suspense fallback={<SeatMapSkeleton />}>
          <SeatMap showId={show.id} />
        </Suspense>
        <BookingSummary showId={show.id} />
      </Container>
    </>
  );
}
