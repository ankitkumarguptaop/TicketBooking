import Link from "next/link";

import { getFeaturedMovie, posterToneClassName } from "@/entities/movie";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

export async function HeroBanner() {
  const movie = await getFeaturedMovie();

  return (
    <section
      aria-labelledby="hero-title"
      className={cn("bg-linear-to-r", posterToneClassName[movie.posterTone])}
    >
      <Container className="flex min-h-80 flex-col justify-center gap-4 py-12 lg:min-h-105">
        <Badge className="rounded-sm bg-background px-2 text-[0.625rem] font-bold tracking-wide text-primary uppercase">
          Now showing
        </Badge>
        <h1 id="hero-title" className="font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {movie.title}
        </h1>
        <p className="max-w-xl text-sm md:text-base">{movie.tagline}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href={`/movies/${movie.id}`}>Book tickets</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-foreground hover:bg-foreground/10">
            <Link href={`/movies/${movie.id}`}>Watch trailer</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
