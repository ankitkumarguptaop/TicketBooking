import { cn } from "@/shared/lib/utils";

import { posterToneClassName } from "../lib/poster-tone";
import type { PosterTone } from "../model/types";

type Props = {
  title: string;
  tone: PosterTone;
  className?: string;
};

export function MoviePoster({ title, tone, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex aspect-3/4 items-end rounded-lg bg-linear-to-br p-4",
        posterToneClassName[tone],
        className,
      )}
    >
      <span className="text-lg leading-tight font-bold text-foreground">{title}</span>
    </div>
  );
}
