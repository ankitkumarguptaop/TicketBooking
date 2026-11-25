import { Container } from "@/shared/ui/container";
import { Skeleton } from "@/shared/ui/skeleton";
import { ShowtimeListSkeleton } from "@/widgets/showtime-list";

/**
 * Also the Suspense boundary around page.tsx, which reads `params`: the App
 * Shell (shared by every movie URL) shows this instead of one movie's data.
 */
export default function MovieLoading() {
  return (
    <>
      <div aria-busy aria-label="Loading movie" className="border-b border-border bg-card">
        <Container className="flex flex-col gap-8 py-10 md:flex-row md:py-12">
          <Skeleton className="aspect-3/4 w-48 shrink-0 rounded-lg md:w-64" />
          <div className="flex w-full max-w-2xl flex-col gap-4">
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </Container>
      </div>
      <Container className="pt-10">
        <ShowtimeListSkeleton />
      </Container>
    </>
  );
}
