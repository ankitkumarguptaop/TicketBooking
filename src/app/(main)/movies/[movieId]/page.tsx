import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getMovieById } from "@/entities/movie";
import { Container } from "@/shared/ui/container";
import { MovieDetails } from "@/widgets/movie-details";
import { ShowtimeList, ShowtimeListSkeleton } from "@/widgets/showtime-list";

export async function generateMetadata({ params }: PageProps<"/movies/[movieId]">): Promise<Metadata> {
  const movie = await getMovieById((await params).movieId);
  return { title: movie?.title ?? "Movie not found" };
}

export default async function MoviePage({ params, searchParams }: PageProps<"/movies/[movieId]">) {
  const movie = await getMovieById((await params).movieId);
  if (!movie) notFound();

  return (
    <>
      <MovieDetails movie={movie} />
      <Container className="flex flex-col gap-12 pt-10">
        <Suspense fallback={<ShowtimeListSkeleton />}>
          <ShowtimeList movie={movie} searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
