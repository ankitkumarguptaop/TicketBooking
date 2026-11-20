import { Skeleton } from "@/shared/ui/skeleton";

type Props = {
  rows: number;
};

export function NotificationSettingsSkeleton({ rows }: Props) {
  return (
    <div aria-busy aria-label="Loading notification settings" className="flex flex-col gap-3">
      {Array.from({ length: rows }, (_, row) => (
        <div key={`row-${row}`} className="flex items-center justify-between gap-4 py-1.5">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-64 max-w-full" />
          </div>
          <Skeleton className="h-[18px] w-8 rounded-full" />
        </div>
      ))}
    </div>
  );
}
