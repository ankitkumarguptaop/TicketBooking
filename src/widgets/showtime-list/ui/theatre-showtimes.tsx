import { ShowtimeButton, type Show } from "@/entities/show";

type Props = {
  /** Shows of one theatre. Never empty. */
  shows: Show[];
};

const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

export function TheatreShowtimes({ shows }: Props) {
  const { theatreName, city } = shows[0];

  return (
    <li className="grid gap-4 border-t border-border py-6 md:grid-cols-[22rem_1fr] md:items-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold">{theatreName}</h3>
        <p className="text-xs text-muted-foreground">{city}</p>
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
