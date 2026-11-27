import { io } from "next/cache";

import type { MovieSummary } from "@/entities/movie";
import { getShowsForMovie, type Show } from "@/entities/show";
import { DateSelector, getSelectedShowDate, getShowDates } from "@/features/select-show-date";

import { ShowtimeSection } from "./showtime-section";
import { TheatreShowtimes } from "./theatre-showtimes";

type Props = {
  movie: MovieSummary;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** One list per theatre, theatres in the order their first show appears. */
function groupByTheatre(shows: Show[]): Show[][] {
  const byTheatre = new Map<string, Show[]>();
  for (const show of shows) {
    byTheatre.set(show.theatreId, [...(byTheatre.get(show.theatreId) ?? []), show]);
  }
  return [...byTheatre.values()];
}

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
  // The list is cached for a few minutes, so drop shows that started since.
  const shows = (await getShowsForMovie(movie.id, selected.key)).filter((show) => new Date(show.startsAt) > now);
  const theatresWithShows = groupByTheatre(shows);

  return (
    <ShowtimeSection>
      <DateSelector dates={dates} selectedKey={selected.key} />
      {theatresWithShows.length === 0 ? (
        <p className="border-t border-border pt-6 text-sm text-muted-foreground">
          No more shows on this day. Pick another date.
        </p>
      ) : (
        <ul>
          {theatresWithShows.map((theatreShows) => (
            <TheatreShowtimes key={theatreShows[0].theatreId} shows={theatreShows} />
          ))}
        </ul>
      )}
    </ShowtimeSection>
  );
}
