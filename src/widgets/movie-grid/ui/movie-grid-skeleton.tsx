import type { ReactNode } from "react";

import { Skeleton } from "@/shared/ui/skeleton";

import { MovieGridLayout } from "./movie-grid-layout";

const placeholderCards = ["card-1", "card-2", "card-3", "card-4", "card-5"];

type Props = {
  title: string;
  actions?: ReactNode;
};

export function MovieGridSkeleton({ title, actions }: Props) {
  return (
    <MovieGridLayout title={title} actions={actions}>
      <div
        aria-busy
        aria-label="Loading movies"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6"
      >
        {placeholderCards.map((id) => (
          <div key={id} className="flex flex-col gap-3">
            <Skeleton className="aspect-2/3 rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </MovieGridLayout>
  );
}
