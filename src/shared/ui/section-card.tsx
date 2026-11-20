import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type Props = {
  /** Used for the heading id and as the in-page anchor (#id). */
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
};

export function SectionCard({ id, title, className, children }: Props) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      // scroll-mt keeps the heading clear of the sticky site header when jumped to.
      className={cn("flex scroll-mt-24 flex-col gap-4 rounded-xl bg-card p-6", className)}
    >
      <h2 id={headingId} className="font-heading text-base font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}
