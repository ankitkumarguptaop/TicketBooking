import { createEntityAdapter } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/api/base-api";

import { buildDummySeatMap, dummyAisleAfter } from "../lib/dummy-seat-map";
import type { Seat, SeatMap } from "../model/types";

const seatsAdapter = createEntityAdapter<Seat>();

const seatMapApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSeatMap: build.query<SeatMap, string>({
      // Dummy data for now. With the real API, swap queryFn for a query to /shows/:showId/seats
      // and a transformResponse that runs seatsAdapter.setAll on the returned seats.
      queryFn: async (showId) => {
        const { sections, seats } = buildDummySeatMap(showId);
        return {
          data: {
            sections,
            aisleAfter: dummyAisleAfter,
            seats: seatsAdapter.setAll(seatsAdapter.getInitialState(), seats),
          },
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
