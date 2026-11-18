import { useId, type ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function MovieGridLayout({ title, children }: Props) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-4">
      <h2 id={headingId} className="font-heading text-lg font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}
