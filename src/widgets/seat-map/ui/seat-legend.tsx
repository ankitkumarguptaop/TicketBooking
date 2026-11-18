import { seatStateClassName, seatStateLabel, type SeatVisualState } from "@/entities/seat";
import { cn } from "@/shared/lib/utils";

const legendStates: SeatVisualState[] = ["available", "selected", "held", "booked"];

export function SeatLegend() {
  return (
    <ul aria-label="Seat legend" className="flex flex-wrap justify-center gap-6">
      {legendStates.map((state) => (
        <li key={state} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span aria-hidden className={cn("size-5 rounded-md border", seatStateClassName[state])} />
          {seatStateLabel[state]}
        </li>
      ))}
    </ul>
  );
}
