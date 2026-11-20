import Link from "next/link";

import { SignOutButton } from "@/features/sign-out";
import { cn } from "@/shared/lib/utils";

const itemClassName =
  "block w-full rounded-lg px-3 py-2.5 text-xs text-muted-foreground transition-colors outline-none hover:bg-secondary/60 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50";

const links = [
  { href: "#personal-details", label: "Personal details" },
  { href: "#notifications", label: "Notifications" },
  { href: "#security", label: "Security" },
  { href: "/bookings", label: "My bookings" },
];

export function ProfileSectionNav() {
  return (
    <nav aria-label="Profile sections">
      <ul className="flex flex-col gap-1">
        {links.map((link, index) => (
          <li key={link.href}>
            <Link
              href={link.href}
              // Highlights the first section only; following the scroll position would need a client observer.
              className={cn(itemClassName, index === 0 && "bg-secondary font-semibold text-foreground")}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <SignOutButton className={itemClassName} />
        </li>
      </ul>
    </nav>
  );
}
