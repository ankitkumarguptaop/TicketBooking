import Link from "next/link";
import { Suspense } from "react";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Container } from "@/shared/ui/container";

import { NavLinkList } from "./nav-link-list";
import { NavLinks } from "./nav-links";

// Placeholders until the session and notifications APIs exist.
const city = "Bengaluru";
const unreadNotifications = 3;
const userInitials = "AK";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center gap-6">
        <div className="flex items-center gap-5">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight text-primary">
            Balcony
          </Link>
          <span className="text-xs font-semibold">{city}</span>
        </div>

        <div role="search" className="hidden flex-1 md:block">
          <label htmlFor="site-search" className="sr-only">
            Search movies and theatres
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Search movies, theatres"
            className="h-9 w-full max-w-xl rounded-full border border-input bg-card px-4 text-xs placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>

        <nav aria-label="Main" className="ml-auto hidden md:block">
          {/* The pathname is request data on dynamic routes, so the highlight streams in. */}
          <Suspense fallback={<NavLinkList pathname={null} />}>
            <NavLinks />
          </Suspense>
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <Link
            href="/notifications"
            aria-label={`${unreadNotifications} unread notifications`}
            className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {unreadNotifications}
          </Link>
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </div>
      </Container>
    </header>
  );
}
