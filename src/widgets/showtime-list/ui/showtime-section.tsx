import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ShowtimeSection({ children }: Props) {
  return (
    <section id="showtimes" aria-labelledby="showtimes-heading" className="flex scroll-mt-24 flex-col gap-5">
      <h2 id="showtimes-heading" className="font-heading text-lg font-bold">
        Showtimes
      </h2>
      {children}
    </section>
  );
}
