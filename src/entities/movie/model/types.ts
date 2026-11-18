export type MovieStatus = "now-showing" | "coming-soon";

export type PosterTone = "violet" | "teal" | "orange" | "green" | "berry" | "slate";

export type Certificate = "U" | "UA" | "A";

export type Movie = {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  /** First entry is the original language. */
  languages: string[];
  certificate: Certificate;
  rating: number;
  status: MovieStatus;
  posterTone: PosterTone;
  durationMinutes: number;
  /** 0 for movies that have not been released yet. */
  ratingCount: number;
  description: string;
  formats: string[];
  /** ISO date-time strings of upcoming shows. Empty for coming-soon movies. */
  showtimes: string[];
};

export type MovieSummary = Omit<Movie, "showtimes">;
