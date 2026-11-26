import { Star } from "lucide-react";
import Link from "next/link";

import { getFeaturedMovie, MovieMeta, MoviePoster, posterToneClassName } from "@/entities/movie";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

// One entrance on load: each line fades up a little later than the one before.
// tw-animate-css classes, so no client JavaScript; skipped under reduced motion.
const enter =
  "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-enter motion-reduce:animate-none";

export async function HeroBanner() {
  const movie = await getFeaturedMovie();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-border">
      {/* A soft glow of the poster's colour instead of a full-width gradient. */}
      <div
        aria-hidden
        className={cn(
          "absolute -top-1/3 right-0 -z-10 h-[140%] w-3/4 rounded-full bg-linear-to-br opacity-25 blur-3xl",
          posterToneClassName[movie.posterTone],
        )}
      />
      <Container className="grid items-center gap-10 py-14 md:min-h-[70svh] md:grid-cols-12 md:py-16">
        <div className="flex flex-col items-start gap-5 md:col-span-7">
          <p className={cn("text-xs font-semibold tracking-widest text-primary uppercase", enter)}>
            Now showing
          </p>
          <h1
            id="hero-title"
            className={cn(
              "font-heading text-5xl leading-[1.02] font-bold tracking-tight text-balance md:text-7xl",
              enter,
              "delay-100",
            )}
          >
            {movie.title}
          </h1>
          <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-sm", enter, "delay-200")}>
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              <Star aria-hidden className="size-3.5 fill-current" />
              <span className="sr-only">Rated </span>
              {movie.rating.toFixed(1)}
              <span className="sr-only"> out of 5</span>
            </span>
            <MovieMeta movie={movie} showDuration />
          </div>
          <p className={cn("max-w-lg text-base text-foreground/85 md:text-lg", enter, "delay-300")}>
            {movie.tagline}
          </p>
          <div className={cn("mt-2 flex flex-wrap gap-3", enter, "delay-400")}>
            <Button asChild size="lg" className="px-6">
              <Link href={`/movies/${movie.id}`}>Book tickets</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-6">
              <Link href={`/movies/${movie.id}#showtimes`}>See showtimes</Link>
            </Button>
          </div>
        </div>
        <div className={cn("hidden w-full max-w-sm justify-self-end md:col-span-5 md:col-start-8 md:block lg:col-span-4 lg:col-start-9", enter, "delay-300 duration-1000")}>
          <MoviePoster title={movie.title} tone={movie.posterTone} size="lg" className="shadow-2xl shadow-black/40" />
        </div>
      </Container>
    </section>
  );
}
