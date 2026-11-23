import { BadgeCheckIcon, CircleAlertIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

type Props = {
  verified: boolean;
  className?: string;
};

/** "Verified" in green, or "Not verified" in red. Text, not just colour, so it reads without colour vision. */
export function VerifiedBadge({ verified, className }: Props) {
  return verified ? (
    <Badge className={cn("bg-success/15 text-[0.625rem] font-semibold text-success", className)}>
      <BadgeCheckIcon aria-hidden data-icon="inline-start" />
      Verified
    </Badge>
  ) : (
    <Badge variant="destructive" className={cn("text-[0.625rem] font-semibold", className)}>
      <CircleAlertIcon aria-hidden data-icon="inline-start" />
      Not verified
    </Badge>
  );
}
