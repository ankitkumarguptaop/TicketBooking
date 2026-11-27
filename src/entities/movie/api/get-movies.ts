import { cacheLife } from "next/cache";

import { maxPageSize, type Page } from "@/shared/api/page";
import { serverGet } from "@/shared/api/server-get";
import { toIndiaDateKey } from "@/shared/lib/india-date-key";
import { isUuid } from "@/shared/lib/is-uuid";

import { toMovie } from "../lib/to-movie";
import type { MovieDto } from "../model/movie-dto";
import type { MovieSummary } from "../model/types";

/**
 * First page only (the API caps a page at 100). Add paging here once the
 * catalogue grows past that.
 */
export async function getMovies(): Promise<MovieSummary[]> {
  "use cache";
  cacheLife("minutes");
  const page = await serverGet<Page<MovieDto>>(`/movies?limit=${maxPageSize}`);
  const todayKey = toIndiaDateKey(new Date());
  return (page?.items ?? []).map((dto) => toMovie(dto, todayKey));
}

export async function getMovieById(id: string): Promise<MovieSummary | null> {
  "use cache";
  cacheLife("minutes");
  if (!isUuid(id)) return null;
  const dto = await serverGet<MovieDto>(`/movies/${id}`);
  return dto ? toMovie(dto, toIndiaDateKey(new Date())) : null;
}
