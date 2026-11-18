import { Suspense } from "react";

import { FilterChips, FilterChipsSkeleton } from "@/features/filter-movies";
import { Container } from "@/shared/ui/container";
import { HeroBanner } from "@/widgets/hero-banner";
import { MovieGrid, MovieGridSkeleton } from "@/widgets/movie-grid";

const nowShowingTitle = "Now showing in Bengaluru";
const comingSoonTitle = "Coming soon";

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <>
      <HeroBanner />
      <Container className="flex flex-col gap-8 pt-8">
        <Suspense fallback={<FilterChipsSkeleton />}>
          <FilterChips searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<MovieGridSkeleton title={nowShowingTitle} />}>
          <MovieGrid title={nowShowingTitle} status="now-showing" searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<MovieGridSkeleton title={comingSoonTitle} />}>
          <MovieGrid title={comingSoonTitle} status="coming-soon" searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
