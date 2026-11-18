import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";

type Props = ComponentProps<"div">;

/** Page-width wrapper: 1440px max with the Figma side gutters. */
export function Container({ className, ...props }: Props) {
  return <div className={cn("mx-auto w-full max-w-360 px-4 md:px-8 lg:px-16", className)} {...props} />;
}
