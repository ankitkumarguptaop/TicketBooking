import { Container } from "@/shared/ui/container";
import { Stepper } from "@/shared/ui/stepper";

import { HoldCountdown } from "./hold-countdown";

type Props = {
  showId: string;
  movieTitle: string;
  theatreName: string;
  screenName: string;
  startsAt: string;
};

const bookingSteps = ["Seats", "Payment", "Ticket"];
const dayFormat = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });
const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

export function BookingHeader({ showId, movieTitle, theatreName, screenName, startsAt }: Props) {
  const start = new Date(startsAt);

  return (
    <div className="border-b border-border bg-card">
      <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-xl font-bold">{movieTitle}</h1>
          <p className="text-xs text-muted-foreground">
            {theatreName}, {screenName} · {dayFormat.format(start)}, {timeFormat.format(start)}
          </p>
        </div>
        <Stepper steps={bookingSteps} currentStep={0} className="hidden md:flex" />
        <HoldCountdown showId={showId} />
      </Container>
    </div>
  );
}
