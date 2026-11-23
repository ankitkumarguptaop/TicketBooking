"use client";

import { io } from "next/cache";
import { use, useCallback } from "react";

import { useGetSeatMapQuery } from "@/entities/seat";
import { useAppDispatch } from "@/shared/lib/store-hooks";
import { Button } from "@/shared/ui/button";

import { toggleSeat } from "../model/toggle-seat";
import { ScreenIndicator } from "./screen-indicator";
import { SeatLegend } from "./seat-legend";
import { SeatMapSkeleton } from "./seat-map-skeleton";
import { SeatSection } from "./seat-section";

type Props = {
  showId: string;
};

export function SeatMap({ showId }: Props) {
  // RTK Query reads the clock when the query starts. Keep that out of the
  // prerendered static shell; the parent's <Suspense> shows the skeleton.
  use(io());
  const { data, isLoading, isError, refetch } = useGetSeatMapQuery(showId);
  const dispatch = useAppDispatch();

  // Stable: every memoised Seat receives this, so a new function would re-render all of them.
  const handleToggle = useCallback(
    (seatId: string) => {
      void dispatch(toggleSeat(showId, seatId));
    },
    [dispatch, showId],
  );

  if (isLoading) return <SeatMapSkeleton />;

  if (isError || !data) {
    return (
      <div role="alert" className="flex flex-col items-start gap-3 rounded-lg border border-border p-8">
        <p className="text-sm font-semibold">We couldn’t load the seat map.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <section aria-label="Seat map" className="flex min-w-0 flex-col gap-8">
      <div className="overflow-x-auto pb-2">
        <div className="mx-auto flex w-max flex-col gap-6">
          {data.sections.map((section) => (
            <SeatSection
              key={section.tier}
              showId={showId}
              section={section}
              aisleAfter={data.aisleAfter}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
      <ScreenIndicator />
      <SeatLegend />
    </section>
  );
}
