import Link from "next/link";

import type { MovieSummary } from "../model/types";
import { MoviePoster } from "./movie-poster";

type Props = {
  movie: MovieSummary;
};

export function MovieCard({ movie }: Props) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group flex flex-col gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <MoviePoster
        title={movie.title}
        tone={movie.posterTone}
        className="transition-transform group-hover:-translate-y-1"
      />
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">
          {movie.genre} · {movie.languages[0]} · {movie.certificate}
        </p>
        <p className="text-xs font-semibold text-primary">
          <span className="sr-only">Rated </span>
          {movie.rating.toFixed(1)} / 5
        </p>
      </div>
    </Link>
  );
}
