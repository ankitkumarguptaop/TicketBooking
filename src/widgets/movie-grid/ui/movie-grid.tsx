import { io } from "next/cache";
import Link from "next/link";

import { getMovies, MovieCard, type MovieStatus } from "@/entities/movie";
import { getActiveFilter } from "@/features/filter-movies";

import { MovieGridLayout } from "./movie-grid-layout";

type Props = {
  title: string;
  status: MovieStatus;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function MovieGrid({ title, status, searchParams }: Props) {
  const filter = getActiveFilter(await searchParams);
  // io() keeps the clock read out of the prerendered shell, so "today" means
  // the visitor's request time, not the build time.
  await io();
  const now = new Date();
  const movies = (await getMovies(status, now)).filter((movie) => filter.matches(movie, now));

  return (
    <MovieGridLayout title={title}>
      {movies.length === 0 ? (
        <div className="flex flex-col items-start gap-2 rounded-lg border border-dashed border-border p-8">
          <p className="text-sm font-semibold">No movies match “{filter.label}”</p>
          <Link href="/" scroll={false} className="text-xs font-semibold text-primary hover:underline">
            Show all movies
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
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
