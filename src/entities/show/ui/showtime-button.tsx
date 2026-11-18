import Link from "next/link";

import { cn } from "@/shared/lib/utils";

import type { ShowAvailability } from "../model/types";

type Props = {
  showId: string;
  timeLabel: string;
  priceFrom: number;
  availability: ShowAvailability;
};

const tileClassName =
  "flex h-15 w-32 flex-col items-center justify-center gap-0.5 rounded-md border text-center";

export function ShowtimeButton({ showId, timeLabel, priceFrom, availability }: Props) {
  if (availability === "sold-out") {
    return (
      <div aria-disabled className={cn(tileClassName, "border-border text-muted-foreground opacity-60")}>
        <span className="text-sm font-semibold">{timeLabel}</span>
        <span className="text-[0.625rem]">Sold out</span>
      </div>
    );
  }

  const isFillingFast = availability === "filling-fast";

  return (
    <Link
      href={`/shows/${showId}`}
      className={cn(
        tileClassName,
        "outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
        isFillingFast
          ? "border-primary/70 text-primary hover:bg-primary/10"
          : "border-success/50 text-success hover:bg-success/10",
      )}
    >
      <span className="text-sm font-semibold">{timeLabel}</span>
      <span className="text-[0.625rem]">{isFillingFast ? "Filling fast" : `from Rs ${priceFrom}`}</span>
    </Link>
  );
}
