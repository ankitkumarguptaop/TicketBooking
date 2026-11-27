import type { SeatSectionLayout } from "@/entities/seat";

import { SeatRow } from "./seat-row";

type Props = {
  showId: string;
  section: SeatSectionLayout;
  columnCount: number;
  onToggle: (seatId: string) => void;
};

export function SeatSection({ showId, section, columnCount, onToggle }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="mb-1 text-[0.625rem] font-bold tracking-widest text-muted-foreground uppercase">
        {section.label} · Rs {section.price}
      </p>
      {section.rows.map((row) => (
        <SeatRow key={row.id} showId={showId} row={row} columnCount={columnCount} onToggle={onToggle} />
      ))}
    </div>
  );
}
