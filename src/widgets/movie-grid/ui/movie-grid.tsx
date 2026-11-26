import { io } from "next/cache";
import Link from "next/link";
import type { ReactNode } from "react";

import { getMovies, MovieCard, type MovieStatus } from "@/entities/movie";
import { getActiveFilter } from "@/features/filter-movies";

import { MovieGridLayout } from "./movie-grid-layout";

type Props = {
  title: string;
  status: MovieStatus;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  actions?: ReactNode;
};

export async function MovieGrid({ title, status, searchParams, actions }: Props) {
  const filter = getActiveFilter(await searchParams);
  // io() keeps the clock read out of the prerendered shell, so "today" means
  // the visitor's request time, not the build time.
  await io();
  const now = new Date();
  const movies = (await getMovies(status, now)).filter((movie) => filter.matches(movie, now));
  const count = `${movies.length} ${movies.length === 1 ? "film" : "films"}`;

  return (
    <MovieGridLayout title={title} count={count} actions={actions}>
      {movies.length === 0 ? (
        <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-border p-8">
          <p className="text-sm font-semibold">Nothing here for “{filter.label}”</p>
          <p className="text-sm text-muted-foreground">Try another filter, or see everything that’s on.</p>
          <Link
            href="/"
            scroll={false}
            className="mt-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Show all movies
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </MovieGridLayout>
  );
}
