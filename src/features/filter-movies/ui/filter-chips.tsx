import Link from "next/link";

import { cn } from "@/shared/lib/utils";

import { allFilterId, getActiveFilter, movieFilters } from "../model/movie-filters";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function FilterChips({ searchParams }: Props) {
  const activeFilter = getActiveFilter(await searchParams);

  return (
    <nav aria-label="Filter movies" className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <ul className="flex w-max gap-2">
        {movieFilters.map((filter) => {
          const isActive = filter.id === activeFilter.id;
          return (
            <li key={filter.id}>
              <Link
                href={filter.id === allFilterId ? "/" : `/?filter=${filter.id}`}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap outline-none transition-[background-color,border-color,color,scale] duration-150 ease-soft focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.985] motion-reduce:transition-none",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {filter.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
