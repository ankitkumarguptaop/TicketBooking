import type { SeatRowLayout } from "@/entities/seat";
import { Seat } from "@/features/select-seats";
import { cn } from "@/shared/lib/utils";

type Props = {
  showId: string;
  row: SeatRowLayout;
  aisleAfter: number[];
  onToggle: (seatId: string) => void;
};

const rowLabelClassName = "w-4 text-center text-[0.625rem] text-muted-foreground";

export function SeatRow({ showId, row, aisleAfter, onToggle }: Props) {
  return (
    <div role="group" aria-label={`Row ${row.label}`} className="flex items-center gap-1.5">
      <span aria-hidden className={rowLabelClassName}>
        {row.label}
      </span>
      {row.seats.map((seat) => (
        <span key={seat.id} className={cn(aisleAfter.includes(seat.number) && "mr-6")}>
          <Seat showId={showId} seatId={seat.id} number={seat.number} onToggle={onToggle} />
        </span>
      ))}
      <span aria-hidden className={rowLabelClassName}>
        {row.label}
      </span>
    </div>
  );
}
