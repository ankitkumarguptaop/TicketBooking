import Link from "next/link";

import type { MovieSummary } from "../model/types";
import { MovieMeta } from "./movie-meta";
import { MoviePoster } from "./movie-poster";

type Props = {
  movie: MovieSummary;
};

export function MovieCard({ movie }: Props) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group flex h-full flex-col gap-3 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <MoviePoster
        title={movie.title}
        posterUrl={movie.posterUrl}
        tone={movie.posterTone}
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        label={movie.status === "coming-soon" ? "Coming soon" : undefined}
        className="transition-[translate,border-color] duration-150 ease-soft group-hover:-translate-y-0.5 group-hover:border-foreground/25 motion-reduce:transition-none"
      />
      <div className="flex flex-col gap-1">
        <h3 className="truncate text-sm font-semibold">{movie.title}</h3>
        <MovieMeta movie={movie} className="text-xs" />
      </div>
    </Link>
  );
}
