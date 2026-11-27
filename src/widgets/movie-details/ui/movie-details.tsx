import { MovieMeta, MoviePoster, type MovieSummary } from "@/entities/movie";
import { Container } from "@/shared/ui/container";

type Props = {
  movie: MovieSummary;
};

export function MovieDetails({ movie }: Props) {
  return (
    <section aria-labelledby="movie-title" className="border-b border-border bg-card">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:py-12">
        <MoviePoster
          title={movie.title}
          posterUrl={movie.posterUrl}
          tone={movie.posterTone}
          sizes="(min-width: 768px) 16rem, 12rem"
          className="w-48 shrink-0 md:w-64"
        />

        <div className="flex max-w-2xl flex-col gap-4">
          <h1 id="movie-title" className="font-heading text-4xl font-bold tracking-tight">
            {movie.title}
          </h1>
          <MovieMeta movie={movie} showDuration className="text-sm" />

          {movie.genres.length > 1 && (
            <ul aria-label="Genres" className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <li key={genre} className="rounded-full border border-border px-3 py-1 text-xs">
                  {genre}
                </li>
              ))}
            </ul>
          )}

          {movie.description && (
            <p className="text-sm leading-relaxed text-secondary-foreground">{movie.description}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
