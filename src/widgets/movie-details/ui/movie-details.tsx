import { MoviePoster, type MovieSummary } from "@/entities/movie";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

type Props = {
  movie: MovieSummary;
};

function formatDuration(minutes: number) {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

const countFormat = new Intl.NumberFormat("en-IN");

export function MovieDetails({ movie }: Props) {
  const isReleased = movie.status === "now-showing";

  return (
    <section aria-labelledby="movie-title" className="border-b border-border bg-card">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:py-12">
        <MoviePoster title={movie.title} tone={movie.posterTone} className="w-48 shrink-0 md:w-64" />

        <div className="flex max-w-2xl flex-col gap-4">
          <h1 id="movie-title" className="font-heading text-4xl font-bold tracking-tight">
            {movie.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {movie.genre} · {movie.languages.join(", ")} · {movie.certificate} ·{" "}
            {formatDuration(movie.durationMinutes)}
          </p>

          {isReleased && (
            <div className="flex flex-wrap items-center gap-3">
              <p className="flex h-10 items-center gap-2 rounded-md bg-secondary px-3">
                <span className="text-lg font-bold text-primary">{movie.rating.toFixed(1)} / 5</span>
                <span className="text-xs text-muted-foreground">
                  {countFormat.format(movie.ratingCount)} ratings
                </span>
              </p>
              {/* Rating flow is a separate task (features/post-review). */}
              <Button variant="outline" size="lg" className="h-10" disabled>
                Rate this movie
              </Button>
            </div>
          )}

          <p className="text-sm leading-relaxed text-secondary-foreground">{movie.description}</p>

          <ul aria-label="Formats" className="flex flex-wrap gap-2">
            {movie.formats.map((format) => (
              <li key={format} className="rounded-full border border-border px-3 py-1 text-xs">
                {format}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
