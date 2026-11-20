import { Skeleton } from "@/shared/ui/skeleton";

export function ProfileSummarySkeleton() {
  return (
    <div aria-busy aria-label="Loading profile" className="flex flex-col items-center gap-2">
      <Skeleton className="mb-2 size-22 rounded-full" />
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-5 w-24 rounded-full" />
      <Skeleton className="mt-4 h-10 w-full" />
    </div>
  );
}
