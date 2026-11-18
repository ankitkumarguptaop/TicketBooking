import Link from "next/link";

import { cn } from "@/shared/lib/utils";

type Props = {
  /** Pathname of the current page, or null while it isn't known yet. */
  pathname: string | null;
};

const links = [
  { href: "/", label: "Movies", activePrefixes: ["/movies", "/shows"] },
  { href: "/theatres", label: "Theatres", activePrefixes: ["/theatres"] },
  { href: "/bookings", label: "My bookings", activePrefixes: ["/bookings"] },
];

export function NavLinkList({ pathname }: Props) {
  return (
    <ul className="flex items-center gap-6">
      {links.map((link) => {
        const isActive =
          pathname !== null &&
          (pathname === link.href || link.activePrefixes.some((prefix) => pathname.startsWith(prefix)));
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "text-xs font-medium transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
