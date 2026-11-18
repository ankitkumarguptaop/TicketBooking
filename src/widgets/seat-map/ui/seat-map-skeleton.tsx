import { Skeleton } from "@/shared/ui/skeleton";

const placeholderRows = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10"];

export function SeatMapSkeleton() {
  return (
    <div aria-busy aria-label="Loading seat map" className="flex flex-col items-center gap-2 overflow-hidden">
      {placeholderRows.map((id) => (
        <Skeleton key={id} className="h-7 w-full max-w-160 rounded-md" />
      ))}
    </div>
  );
}
