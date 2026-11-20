import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { cn } from "@/shared/lib/utils";

import { getInitials } from "../lib/get-initials";

type Props = {
  name: string;
  className?: string;
};

export function UserAvatar({ name, className }: Props) {
  return (
    <Avatar className={cn("size-8", className)}>
      <AvatarFallback className="bg-primary font-bold text-primary-foreground">{getInitials(name)}</AvatarFallback>
    </Avatar>
  );
}
