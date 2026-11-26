import { cn } from "@/shared/lib/utils";

import { formatDuration } from "../lib/format-duration";
import type { MovieSummary } from "../model/types";

type Props = {
  movie: Pick<MovieSummary, "genre" | "languages" | "certificate" | "durationMinutes">;
  showDuration?: boolean;
  className?: string;
};

/** "Thriller · Hindi · UA · 2h 22m": one muted line, props only. */
export function MovieMeta({ movie, showDuration = false, className }: Props) {
  const parts = [movie.genre, movie.languages[0], movie.certificate];
  if (showDuration) parts.push(formatDuration(movie.durationMinutes));

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
