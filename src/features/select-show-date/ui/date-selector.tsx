import Link from "next/link";

import { cn } from "@/shared/lib/utils";

import type { ShowDate } from "../model/show-dates";

type Props = {
  dates: ShowDate[];
  selectedKey: string;
};

const weekdayFormat = new Intl.DateTimeFormat("en-IN", { weekday: "short" });
const monthFormat = new Intl.DateTimeFormat("en-IN", { month: "short" });
const fullDateFormat = new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" });

export function DateSelector({ dates, selectedKey }: Props) {
  return (
    <nav aria-label="Choose a date" className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <ul className="flex w-max gap-2">
        {dates.map(({ key, date }, position) => {
          const isSelected = key === selectedKey;
          return (
            <li key={key}>
              <Link
                href={position === 0 ? "?" : `?date=${key}`}
                scroll={false}
                aria-current={isSelected ? "date" : undefined}
                aria-label={fullDateFormat.format(date)}
                className={cn(
                  "flex h-21 w-16 flex-col items-center justify-center rounded-lg border text-center outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary",
                )}
              >
                <span className="text-[0.625rem] font-medium uppercase">{weekdayFormat.format(date)}</span>
                <span className="text-xl font-bold">{date.getDate()}</span>
                <span className="text-[0.625rem] font-medium uppercase">{monthFormat.format(date)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
