import { baseApi } from "@/shared/api/base-api";

type HoldRequest = {
  showId: string;
  seatId: string;
};

type HoldResponse = {
  seatId: string;
  /** Epoch milliseconds when the hold runs out. */
  heldUntil: number;
};

const holdDurationMs = 10 * 60 * 1000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const holdApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Dummy implementations. With the real API these become POST/DELETE /shows/:showId/holds.
    holdSeat: build.mutation<HoldResponse, HoldRequest>({
      queryFn: async ({ seatId }) => {
        await wait(250);
        return { data: { seatId, heldUntil: Date.now() + holdDurationMs } };
      },
    }),
    releaseSeat: build.mutation<null, HoldRequest>({
      queryFn: async () => ({ data: null }),
    }),
  }),
});
