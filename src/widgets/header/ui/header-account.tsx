"use client";

import Link from "next/link";

import { selectCurrentUser, selectSessionStatus, UserAvatar } from "@/entities/user";
import { useAppSelector } from "@/shared/lib/store-hooks";
import { Skeleton } from "@/shared/ui/skeleton";

const focusRing = "outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

/** Avatar for a signed-in user, "Sign in" for a guest, a placeholder while unsure. */
export function HeaderAccount() {
  const user = useAppSelector(selectCurrentUser);
  const status = useAppSelector(selectSessionStatus);

  if (user) {
    return (
      <Link href="/profile" aria-label={`Your profile, ${user.fullName}`} className={`rounded-full ${focusRing}`}>
        <UserAvatar name={user.fullName} className="text-xs" />
      </Link>
    );
  }

  if (status === "anonymous") {
    return (
      <Link
        href="/login"
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-primary hover:underline ${focusRing}`}
      >
        Sign in
      </Link>
    );
  }

  return <Skeleton aria-label="Loading account" className="size-8 rounded-full" />;
}
