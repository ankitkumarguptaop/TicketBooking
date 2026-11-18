import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ShowtimeSection({ children }: Props) {
  return (
    <section aria-labelledby="showtimes-heading" className="flex flex-col gap-5">
      <h2 id="showtimes-heading" className="font-heading text-lg font-bold">
        Showtimes
      </h2>
      {children}
    </section>
  );
}
