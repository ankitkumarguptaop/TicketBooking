import type { Movie } from "@/entities/movie";

type MovieFilter = {
  id: string;
  label: string;
  matches: (movie: Movie, now: Date) => boolean;
};

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isThisWeekend(date: Date, now: Date) {
  const daysAway = (date.getTime() - now.getTime()) / 86_400_000;
  const isWeekendDay = date.getDay() === 0 || date.getDay() === 6;
  return isWeekendDay && daysAway < 7;
}

const hasGenre = (movie: Movie, genre: string) =>
  movie.genres.some((movieGenre) => movieGenre.toLowerCase() === genre);

const hasShow = (movie: Movie, test: (date: Date) => boolean) =>
  movie.showtimes.some((showtime) => test(new Date(showtime)));

export const allFilterId = "all";

export const movieFilters: MovieFilter[] = [
  { id: allFilterId, label: "All", matches: () => true },
  { id: "hindi", label: "Hindi", matches: (movie) => movie.language === "Hindi" },
  { id: "english", label: "English", matches: (movie) => movie.language === "English" },
  { id: "tamil", label: "Tamil", matches: (movie) => movie.language === "Tamil" },
  { id: "thriller", label: "Thriller", matches: (movie) => hasGenre(movie, "thriller") },
  { id: "comedy", label: "Comedy", matches: (movie) => hasGenre(movie, "comedy") },
  { id: "sci-fi", label: "Sci-fi", matches: (movie) => hasGenre(movie, "sci-fi") },
  {
    id: "today",
    label: "Today",
    matches: (movie, now) => hasShow(movie, (date) => isSameDay(date, now)),
  },
  {
    id: "this-weekend",
    label: "This weekend",
    matches: (movie, now) => hasShow(movie, (date) => isThisWeekend(date, now)),
  },
];

type SearchParams = Record<string, string | string[] | undefined>;

/** Reads `?filter=` from the URL. Unknown or missing values fall back to "All". */
export function getActiveFilter(searchParams: SearchParams): MovieFilter {
  const value = searchParams.filter;
  const id = typeof value === "string" ? value : allFilterId;
  return movieFilters.find((filter) => filter.id === id) ?? movieFilters[0];
}
