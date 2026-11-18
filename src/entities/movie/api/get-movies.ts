import { dummyMovies, dummyShows, featuredMovieId, type DummyShow } from "../lib/dummy-movies";
import type { Movie, MovieStatus, MovieSummary } from "../model/types";

function toShowtimes(shows: DummyShow[], now: Date): string[] {
  return shows.map(({ dayOffset, time }) => {
    const [hours, minutes] = time.split(":").map(Number);
    const show = new Date(now);
    show.setDate(show.getDate() + dayOffset);
    show.setHours(hours, minutes, 0, 0);
    return show.toISOString();
  });
}

/**
 * Dummy implementation. Shows are generated relative to `now` so the
 * "Today" and "This weekend" filters always have something to match.
 */
export async function getMovies(status: MovieStatus, now: Date): Promise<Movie[]> {
  return dummyMovies
    .filter((movie) => movie.status === status)
    .map((movie) => ({ ...movie, showtimes: toShowtimes(dummyShows[movie.id] ?? [], now) }));
}

export async function getFeaturedMovie(): Promise<MovieSummary> {
  return dummyMovies.find(({ id }) => id === featuredMovieId) ?? dummyMovies[0];
}

export async function getMovieById(id: string): Promise<MovieSummary | undefined> {
  return dummyMovies.find((movie) => movie.id === id);
}

export async function getMovieIds(): Promise<string[]> {
  return dummyMovies.map((movie) => movie.id);
}
