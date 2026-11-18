import type { SeatSectionLayout } from "@/entities/seat";

import { SeatRow } from "./seat-row";

type Props = {
  showId: string;
  section: SeatSectionLayout;
  aisleAfter: number[];
  onToggle: (seatId: string) => void;
};

export function SeatSection({ showId, section, aisleAfter, onToggle }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="mb-1 text-[0.625rem] font-bold tracking-widest text-muted-foreground uppercase">
        {section.label} · Rs {section.price}
      </p>
      {section.rows.map((row) => (
        <SeatRow key={row.label} showId={showId} row={row} aisleAfter={aisleAfter} onToggle={onToggle} />
      ))}
    </div>
  );
}
