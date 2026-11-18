import { Skeleton } from "@/shared/ui/skeleton";

import { ShowtimeSection } from "./showtime-section";

const placeholderDates = ["d1", "d2", "d3", "d4", "d5", "d6", "d7"];
const placeholderTheatres = ["t1", "t2", "t3"];

export function ShowtimeListSkeleton() {
  return (
    <ShowtimeSection>
      <div aria-busy aria-label="Loading showtimes" className="flex flex-col gap-6">
        <div className="flex gap-2 overflow-hidden">
          {placeholderDates.map((id) => (
            <Skeleton key={id} className="h-21 w-16 shrink-0 rounded-lg" />
          ))}
        </div>
        {placeholderTheatres.map((id) => (
          <div key={id} className="grid gap-4 border-t border-border pt-6 md:grid-cols-[22rem_1fr]">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-15 w-32 rounded-md" />
              <Skeleton className="h-15 w-32 rounded-md" />
              <Skeleton className="h-15 w-32 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </ShowtimeSection>
  );
}
