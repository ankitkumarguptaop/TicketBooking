"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { selectNeedsVerification, selectSessionStatus } from "@/entities/user";
import { isProtectedPath, loginPathFor, verifyPath, verifyPathFor } from "@/shared/config/routes";
import { useAppSelector } from "@/shared/lib/store-hooks";

/**
 * The proxy blocks signed-out visitors before render. This covers the rest:
 *  - the session ends while a protected page is open (refresh failed,
 *    signed out on another device, signed out here) -> /login
 *  - signed in but a required contact (email, for now) isn't verified
 *    -> /verify, then back here. Phone is optional, so it never redirects.
 * Renders nothing.
 */
export function SessionGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const status = useAppSelector(selectSessionStatus);
  const needsVerification = useAppSelector(selectNeedsVerification);

  useEffect(() => {
    if (!isProtectedPath(pathname)) return;
    if (status === "anonymous") {
      router.replace(loginPathFor(pathname));
    } else if (needsVerification && pathname !== verifyPath) {
      router.replace(verifyPathFor(pathname));
    }
  }, [status, needsVerification, pathname, router]);

  return null;
}
