import { cn } from "@/shared/lib/utils";

import { formatDuration } from "../lib/format-duration";
import type { MovieSummary } from "../model/types";

type Props = {
  movie: Pick<MovieSummary, "genres" | "language" | "certificate" | "durationMinutes">;
  showDuration?: boolean;
  className?: string;
};

/** "Thriller · Hindi · UA 13+ · 2h 22m": one muted line, props only. Missing values are skipped. */
export function MovieMeta({ movie, showDuration = false, className }: Props) {
  const duration = showDuration && movie.durationMinutes ? formatDuration(movie.durationMinutes) : null;
  const parts = [movie.genres[0], movie.language, movie.certificate, duration].filter(
    (part): part is string => Boolean(part),
  );

  return (
    <p className={cn("flex flex-wrap items-center gap-x-1.5 text-muted-foreground", className)}>
      {parts.map((part, index) => (
        <span key={part} className="inline-flex items-center gap-1.5">
          {index > 0 && <span aria-hidden>·</span>}
          {part}
        </span>
      ))}
    </p>
  );
}
