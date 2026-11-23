import { Skeleton } from "@/shared/ui/skeleton";

const fields = ["fullName", "phone", "email"];

export function PersonalDetailsSkeleton() {
  return (
    <div aria-busy aria-label="Loading personal details" className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3">
        <Skeleton className="h-11 w-24 rounded-lg" />
        <Skeleton className="h-11 w-32 rounded-lg" />
      </div>
    </div>
  );
}
