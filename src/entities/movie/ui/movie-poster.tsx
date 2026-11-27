import Image from "next/image";

import { cn } from "@/shared/lib/utils";

import { posterToneClassName } from "../lib/poster-tone";
import type { PosterTone } from "../model/types";

type Props = {
  title: string;
  posterUrl: string | null;
  tone: PosterTone;
  /** How wide the poster renders, for next/image. */
  sizes: string;
  size?: "md" | "lg";
  /** Load early. Only for the hero poster. */
  preload?: boolean;
  /** Small label pinned to the top-left corner, e.g. "Coming soon". */
  label?: string;
  className?: string;
};

/**
 * The movie's poster image, or a gradient with the title when it has none.
 * The outer frame clips, so a parent with `group` can zoom the art inside
 * (`group-hover`) without the frame growing.
 */
export function MoviePoster({ title, posterUrl, tone, sizes, size = "md", preload, label, className }: Props) {
  const artClassName = "absolute inset-0 transition-transform duration-500 ease-soft group-hover:scale-103 motion-reduce:transition-none";

  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-2/3 overflow-hidden rounded-xl border border-foreground/10 bg-card",
        className,
      )}
    >
      {posterUrl ? (
        // unoptimized: posters can come from any https host the admin app saves, and
        // the Next image optimiser only accepts hosts listed in next.config.ts.
        <Image
          src={posterUrl}
          alt=""
          width={400}
          height={600}
          sizes={sizes}
          preload={preload}
          unoptimized
          className={cn(artClassName, "size-full object-cover")}
        />
      ) : (
        <div
          className={cn(
            artClassName,
            "flex items-end bg-linear-to-br",
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
      )}
      {label && (
        <span className="absolute top-3 left-3 rounded-md bg-background/85 px-2 py-1 text-[0.625rem] font-semibold tracking-wide text-foreground uppercase backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
