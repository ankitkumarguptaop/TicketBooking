import { cacheLife } from "next/cache";

import { maxPageSize, type Page } from "@/shared/api/page";
import { serverGet } from "@/shared/api/server-get";
import { isUuid } from "@/shared/lib/is-uuid";

import { toShow } from "../lib/to-show";
import type { ShowDto } from "../model/show-dto";
import type { Show } from "../model/types";

async function listShows(query: URLSearchParams): Promise<Show[]> {
  query.set("limit", String(maxPageSize));
  const page = await serverGet<Page<ShowDto>>(`/shows?${query}`);
  return (page?.items ?? []).map(toShow);
}

/** Upcoming shows of one movie on one day. `dateKey` is YYYY-MM-DD in India time. */
export async function getShowsForMovie(movieId: string, dateKey: string): Promise<Show[]> {
  "use cache";
  cacheLife("minutes");
  return listShows(new URLSearchParams({ movieId, date: dateKey }));
}

/** The next upcoming shows across all movies (first page only), for the home page filters. */
export async function getUpcomingShows(): Promise<Show[]> {
  "use cache";
  cacheLife("minutes");
  return listShows(new URLSearchParams());
}

/** Returns null for unknown or cancelled shows, so the page shows "not found". */
export async function getShowById(id: string): Promise<Show | null> {
  "use cache";
  cacheLife("minutes");
  if (!isUuid(id)) return null;
  const dto = await serverGet<ShowDto>(`/shows/${id}`);
  return dto && dto.status === "SCHEDULED" ? toShow(dto) : null;
}
