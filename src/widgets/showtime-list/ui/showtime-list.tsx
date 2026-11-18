import { io } from "next/cache";

import type { MovieSummary } from "@/entities/movie";
import { getShowsForMovie } from "@/entities/show";
import { getTheatres } from "@/entities/theatre";
import { DateSelector, getSelectedShowDate, getShowDates } from "@/features/select-show-date";

import { ShowtimeSection } from "./showtime-section";
import { TheatreShowtimes } from "./theatre-showtimes";

type Props = {
  movie: MovieSummary;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function ShowtimeList({ movie, searchParams }: Props) {
  if (movie.status === "coming-soon") {
    return (
      <ShowtimeSection>
        <p className="text-sm text-muted-foreground">Bookings open soon. Check back closer to release.</p>
      </ShowtimeSection>
    );
  }

  const params = await searchParams;
  // io() keeps the clock read out of the prerendered shell (request time, not build time).
  await io();
  const now = new Date();
  const dates = getShowDates(now);
  const selected = getSelectedShowDate(params, dates);
  const [shows, theatres] = await Promise.all([
    getShowsForMovie(movie.id, selected.date, now),
    getTheatres(),
  ]);
  const theatresWithShows = theatres
    .map((theatre) => ({ theatre, shows: shows.filter((show) => show.theatreId === theatre.id) }))
    .filter((row) => row.shows.length > 0);

  return (
    <ShowtimeSection>
      <DateSelector dates={dates} selectedKey={selected.key} />
      {theatresWithShows.length === 0 ? (
        <p className="border-t border-border pt-6 text-sm text-muted-foreground">
          No more shows on this day. Pick another date.
        </p>
      ) : (
        <ul>
          {theatresWithShows.map(({ theatre, shows: theatreShows }) => (
            <TheatreShowtimes key={theatre.id} theatre={theatre} shows={theatreShows} />
          ))}
        </ul>
      )}
    </ShowtimeSection>
  );
}
