import { Skeleton } from "@/shared/ui/skeleton";

import { MovieGridLayout } from "./movie-grid-layout";

const placeholderCards = ["card-1", "card-2", "card-3", "card-4", "card-5"];

type Props = {
  title: string;
};

export function MovieGridSkeleton({ title }: Props) {
  return (
    <MovieGridLayout title={title}>
      <div
        aria-busy
        aria-label="Loading movies"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5"
      >
        {placeholderCards.map((id) => (
          <div key={id} className="flex flex-col gap-2">
            <Skeleton className="aspect-3/4 rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </MovieGridLayout>
  );
}
