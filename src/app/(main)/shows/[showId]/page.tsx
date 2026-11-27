import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getShowById } from "@/entities/show";
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

  return (
    <>
      <BookingHeader
        showId={show.id}
        movieTitle={show.movieTitle}
        theatreName={show.theatreName}
        screenName={show.screenName}
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
