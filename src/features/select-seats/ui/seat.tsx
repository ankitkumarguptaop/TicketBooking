"use client";

import { memo } from "react";

import { seatStateClassName, seatStateLabel, useSeat } from "@/entities/seat";
import { cn } from "@/shared/lib/utils";
import { useAppSelector } from "@/shared/lib/store-hooks";

import { selectIsSeatSelected } from "../model/selectors";

type Props = {
  showId: string;
  seatId: string;
  number: number;
  onToggle: (seatId: string) => void;
};

// Memoised with primitive props, and it reads its own status by id, so picking one seat
// re-renders only that seat, not the other ~175.
export const Seat = memo(function Seat({ showId, seatId, number, onToggle }: Props) {
  const seat = useSeat(showId, seatId);
  const isSelected = useAppSelector((state) => selectIsSeatSelected(state, showId, seatId));
  const visualState = isSelected ? "selected" : (seat?.status ?? "booked");
  const isPickable = isSelected || visualState === "available";

  return (
    <button
      type="button"
      disabled={!isPickable}
      aria-pressed={isSelected}
      aria-label={`Seat ${seat?.label ?? number}, Rs ${seat?.price ?? ""}, ${seatStateLabel[visualState]}`}
      onClick={() => onToggle(seatId)}
      className={cn(
        "flex size-7 items-center justify-center rounded-md border text-[0.625rem] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed",
        seatStateClassName[visualState],
      )}
    >
      {number}
    </button>
  );
});
