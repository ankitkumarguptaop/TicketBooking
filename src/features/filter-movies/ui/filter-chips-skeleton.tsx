import { Skeleton } from "@/shared/ui/skeleton";

const placeholderChips = [
  { id: "chip-1", width: "w-12" },
  { id: "chip-2", width: "w-16" },
  { id: "chip-3", width: "w-18" },
  { id: "chip-4", width: "w-16" },
  { id: "chip-5", width: "w-18" },
  { id: "chip-6", width: "w-20" },
  { id: "chip-7", width: "w-16" },
  { id: "chip-8", width: "w-16" },
  { id: "chip-9", width: "w-24" },
];

export function FilterChipsSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden" aria-hidden>
      {placeholderChips.map((chip) => (
        <Skeleton key={chip.id} className={`h-8 shrink-0 rounded-full ${chip.width}`} />
      ))}
    </div>
  );
}
