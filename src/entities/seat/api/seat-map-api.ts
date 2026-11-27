import { createEntityAdapter } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/api/base-api";

import { buildSeatMap } from "../lib/build-seat-map";
import type { ScreenLayoutDto, ShowPricingDto } from "../model/seat-map-dto";
import type { Seat, SeatMap } from "../model/types";

const seatsAdapter = createEntityAdapter<Seat>();

const seatMapApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeatMap: build.query<SeatMap, string>({
      // Two requests: the show gives the screen id and prices, then the screen gives the chairs.
      queryFn: async (showId, _api, _extraOptions, baseQuery) => {
        const showResult = await baseQuery(`/shows/${showId}`);
        if (showResult.error) return { error: showResult.error };
        const show = showResult.data as ShowPricingDto;

        const layoutResult = await baseQuery(`/screens/${show.screenId}/layout`);
        if (layoutResult.error) return { error: layoutResult.error };

        const { sections, columnCount, seats } = buildSeatMap(show, layoutResult.data as ScreenLayoutDto);
        return {
          data: { sections, columnCount, seats: seatsAdapter.setAll(seatsAdapter.getInitialState(), seats) },
        };
      },
      providesTags: (_result, _error, showId) => [{ type: "SeatMap", id: showId }],
    }),
  }),
});

export const { useGetSeatMapQuery } = seatMapApi;

/** Reads one seat from the cached seat map without starting a new request. */
export function useSeat(showId: string, seatId: string) {
  return seatMapApi.endpoints.getSeatMap.useQueryState(showId, {
    selectFromResult: ({ data }) => ({ seat: data?.seats.entities[seatId] }),
  }).seat;
}

export const selectSeatMap = (state: RootState, showId: string) =>
  seatMapApi.endpoints.getSeatMap.select(showId)(state).data;

/** Marks a seat as held by someone else in the cached seat map. */
export const seatTakenByOther = (showId: string, seatId: string) =>
  seatMapApi.util.updateQueryData("getSeatMap", showId, (draft) => {
    const seat = draft.seats.entities[seatId];
    if (seat) seat.status = "held";
  });
