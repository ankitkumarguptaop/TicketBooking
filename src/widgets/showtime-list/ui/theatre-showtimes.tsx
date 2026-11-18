import { ShowtimeButton, type Show } from "@/entities/show";
import type { Theatre } from "@/entities/theatre";

type Props = {
  theatre: Theatre;
  shows: Show[];
};

const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

export function TheatreShowtimes({ theatre, shows }: Props) {
  return (
    <li className="grid gap-4 border-t border-border py-6 md:grid-cols-[22rem_1fr] md:items-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold">
          {theatre.name}, {theatre.area}
        </h3>
        <p className="text-xs text-muted-foreground">
          {theatre.distanceKm} km{theatre.cancellationAvailable && " · Cancellation available"}
        </p>
      </div>
      <ul className="flex flex-wrap gap-3">
        {shows.map((show) => (
          <li key={show.id}>
            <ShowtimeButton
              showId={show.id}
              timeLabel={timeFormat.format(new Date(show.startsAt))}
              priceFrom={show.priceFrom}
              availability={show.availability}
            />
          </li>
        ))}
      </ul>
    </li>
  );
}
