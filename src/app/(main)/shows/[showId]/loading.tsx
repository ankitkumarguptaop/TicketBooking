import { Container } from "@/shared/ui/container";
import { Skeleton } from "@/shared/ui/skeleton";
import { SeatMapSkeleton } from "@/widgets/seat-map";

export default function ShowLoading() {
  return (
    <>
      <div className="h-20 border-b border-border bg-card" />
      <Container className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <SeatMapSkeleton />
        <Skeleton className="h-80 rounded-xl" />
      </Container>
    </>
  );
}
