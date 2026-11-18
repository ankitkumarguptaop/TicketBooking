import { dummySlotsByTheatre, stableHash } from "../lib/dummy-shows";
import type { Show, ShowAvailability } from "../model/types";

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function fakeAvailability(showId: string): ShowAvailability {
  const bucket = stableHash(showId) % 10;
  if (bucket === 0) return "sold-out";
  if (bucket <= 2) return "filling-fast";
  return "available";
}

// Ids look like "orbit-nine_pvr-orion_2026-11-12_2000". Underscores separate the parts
// because movie and theatre ids already contain hyphens.
function buildShow(movieId: string, theatreId: string, day: Date, time: string, priceFrom: number): Show {
  const [hours, minutes] = time.split(":").map(Number);
  const startsAt = new Date(day);
  startsAt.setHours(hours, minutes, 0, 0);
  const id = [movieId, theatreId, toDateKey(day), time.replace(":", "")].join("_");

  return {
    id,
    movieId,
    theatreId,
    startsAt: startsAt.toISOString(),
    priceFrom,
    availability: fakeAvailability(id),
    screen: (stableHash(`${theatreId}${movieId}`) % 4) + 1,
  };
}

/**
 * Dummy implementation: every theatre plays every now-showing movie.
 * Shows that already started today are left out.
 */
export async function getShowsForMovie(movieId: string, day: Date, now: Date): Promise<Show[]> {
  return Object.entries(dummySlotsByTheatre).flatMap(([theatreId, slots]) =>
    slots
      .map(({ time, priceFrom }) => buildShow(movieId, theatreId, day, time, priceFrom))
      .filter((show) => new Date(show.startsAt) > now),
  );
}

/** Rebuilds a dummy show from its id. Returns undefined for ids that don't match a slot. */
export async function getShowById(id: string): Promise<Show | undefined> {
  const [movieId, theatreId, dateKey, hhmm] = id.split("_");
  const slot = dummySlotsByTheatre[theatreId]?.find(({ time }) => time.replace(":", "") === hhmm);
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey ?? "");
  if (!movieId || !slot || !dateMatch) return undefined;

  const day = new Date(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]));
  return buildShow(movieId, theatreId, day, slot.time, slot.priceFrom);
}
