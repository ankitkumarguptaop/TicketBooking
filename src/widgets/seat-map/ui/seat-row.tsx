import type { SeatRowLayout } from "@/entities/seat";
import { Seat } from "@/features/select-seats";

type Props = {
  showId: string;
  row: SeatRowLayout;
  columnCount: number;
  onToggle: (seatId: string) => void;
};

const rowLabelClassName = "w-4 text-center text-[0.625rem] text-muted-foreground";

export function SeatRow({ showId, row, columnCount, onToggle }: Props) {
  return (
    <div role="group" aria-label={`Row ${row.label}`} className="flex items-center gap-1.5">
      <span aria-hidden className={rowLabelClassName}>
        {row.label}
      </span>
      {/* Every row is the same grid, so seats line up in columns and empty columns become aisles.
          The column count and positions come from the API, hence inline styles. */}
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${columnCount}, 1.75rem)` }}>
        {row.seats.map((seat) => (
          <span key={seat.id} style={{ gridColumnStart: seat.column }}>
            <Seat showId={showId} seatId={seat.id} number={seat.number} onToggle={onToggle} />
          </span>
        ))}
      </div>
      <span aria-hidden className={rowLabelClassName}>
        {row.label}
      </span>
    </div>
  );
}
