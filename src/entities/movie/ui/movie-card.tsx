import { Star } from "lucide-react";
import Link from "next/link";

import type { MovieSummary } from "../model/types";
import { MovieMeta } from "./movie-meta";
import { MoviePoster } from "./movie-poster";

type Props = {
  movie: MovieSummary;
};

export function MovieCard({ movie }: Props) {
  const isComingSoon = movie.status === "coming-soon";

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group flex h-full flex-col gap-3 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <MoviePoster
        title={movie.title}
        tone={movie.posterTone}
        label={isComingSoon ? "Coming soon" : undefined}
        className="transition-[translate,border-color] duration-150 ease-soft group-hover:-translate-y-0.5 group-hover:border-foreground/25 motion-reduce:transition-none"
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="truncate text-sm font-semibold">{movie.title}</h3>
          {!isComingSoon && (
            <p className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">
              <Star aria-hidden className="size-3 fill-current" />
              <span className="sr-only">Rated </span>
              {movie.rating.toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </p>
          )}
        </div>
        <MovieMeta movie={movie} className="text-xs" />
      </div>
    </Link>
  );
}
