"use client";

import Link from "next/link";

import { selectHoldError } from "@/features/hold-seats";
import { selectBookingSummary } from "@/features/select-seats";
import { useAppSelector } from "@/shared/lib/store-hooks";
import { Button } from "@/shared/ui/button";

type Props = {
  showId: string;
};

const rowClassName = "flex items-center justify-between gap-4 border-t border-border pt-3 text-xs";

export function BookingSummary({ showId }: Props) {
  const summary = useAppSelector((state) => selectBookingSummary(state, showId));
  const holdError = useAppSelector((state) => selectHoldError(state, showId));
  const hasSeats = summary.seatCount > 0;

  return (
    <aside
      aria-labelledby="summary-heading"
      className="flex h-fit flex-col gap-3 rounded-xl bg-card p-6 lg:sticky lg:top-24"
    >
      <h2 id="summary-heading" className="font-heading text-base font-bold">
        Your seats
      </h2>

      {hasSeats ? (
        summary.lines.map((line) => (
          <p key={line.label} className="flex items-center justify-between gap-4 text-xs">
            <span className="text-muted-foreground">
              {line.seatLabels} · {line.label}
            </span>
            <span className="font-semibold">Rs {line.amount}</span>
          </p>
        ))
      ) : (
        <p className="text-xs text-muted-foreground">Pick seats on the map to continue.</p>
      )}

      <p className={rowClassName}>
        <span className="text-muted-foreground">Convenience fee</span>
        <span className="font-semibold">Rs {summary.fee}</span>
      </p>
      <p className={`${rowClassName} text-base font-bold`}>
        <span>Total</span>
        <span>Rs {summary.total}</span>
      </p>

      {hasSeats ? (
        <Button asChild size="lg" className="w-full">
          <Link href={`/checkout/bk_${showId}`}>Proceed to pay</Link>
        </Button>
      ) : (
        <Button size="lg" className="w-full" disabled>
          Proceed to pay
        </Button>
      )}

      <p className="text-xs text-muted-foreground">
        Seats are held for 10 minutes. If payment is not completed, they are released automatically.
      </p>

      {holdError && (
        <p role="alert" className="rounded-md bg-destructive/15 px-3 py-2 text-xs text-destructive">
          {holdError}
        </p>
      )}
    </aside>
  );
}
