import { cn } from "@/shared/lib/utils";

import { posterToneClassName } from "../lib/poster-tone";
import type { PosterTone } from "../model/types";

type Props = {
  title: string;
  tone: PosterTone;
  size?: "md" | "lg";
  /** Small label pinned to the top-left corner, e.g. "Coming soon". */
  label?: string;
  className?: string;
};

/**
 * Placeholder poster. The outer frame clips, so a parent with `group` can
 * zoom the art inside (`group-hover`) without the frame growing.
 */
export function MoviePoster({ title, tone, size = "md", label, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-2/3 overflow-hidden rounded-xl border border-foreground/10 bg-card",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-end bg-linear-to-br transition-transform duration-500 ease-soft",
          "group-hover:scale-103 motion-reduce:transition-none",
          size === "lg" ? "p-6" : "p-4",
          posterToneClassName[tone],
        )}
      >
        {/* Bottom shade keeps the title readable on the light end of every gradient. */}
        <div className="absolute inset-0 bg-linear-to-t from-background/65 via-background/0 via-55% to-background/0" />
        <span
          className={cn(
            "relative leading-tight font-bold text-balance text-foreground",
            size === "lg" ? "text-3xl" : "text-lg",
          )}
        >
          {title}
        </span>
      </div>
      {label && (
        <span className="absolute top-3 left-3 rounded-md bg-background/85 px-2 py-1 text-[0.625rem] font-semibold tracking-wide text-foreground uppercase backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
