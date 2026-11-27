export type MovieStatus = "now-showing" | "coming-soon";

export type PosterTone = "violet" | "teal" | "orange" | "green" | "berry" | "slate";

export type MovieSummary = {
  id: string;
  title: string;
  description: string | null;
  genres: string[];
  /** Display name, e.g. "Hindi". */
  language: string | null;
  /** Display label, e.g. "UA 13+". */
  certificate: string | null;
  durationMinutes: number | null;
  /** YYYY-MM-DD. */
  releaseDate: string | null;
  posterUrl: string | null;
  /** Gradient used when there is no poster image. */
  posterTone: PosterTone;
  status: MovieStatus;
};

export type Movie = MovieSummary & {
  /** ISO date-times of upcoming shows. Empty for coming-soon movies. */
  showtimes: string[];
};
