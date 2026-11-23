import { Skeleton } from "@/shared/ui/skeleton";

export function VerifyPanelSkeleton() {
  return (
    <div aria-busy aria-label="Loading verification" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}
