import { useId, type ReactNode } from "react";

type Props = {
  title: string;
  /** Muted text after the title, e.g. "6 films". */
  count?: ReactNode;
  /** Controls shown under the heading, e.g. filter chips. */
  actions?: ReactNode;
  children: ReactNode;
};

export function MovieGridLayout({ title, count, actions, children }: Props) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 id={headingId} className="flex items-baseline gap-3 font-heading text-2xl font-bold tracking-tight">
          {title}
          {count && <span className="text-sm font-medium text-muted-foreground">{count}</span>}
        </h2>
        {actions}
      </div>
      {children}
    </section>
  );
}
