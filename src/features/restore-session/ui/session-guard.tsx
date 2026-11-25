"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { selectNeedsVerification, selectSessionEndedRemotely, selectSessionStatus } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";
import { isProtectedPath, loginPathFor, verifyPath, verifyPathFor } from "@/shared/config/routes";
import { useAppDispatch, useAppSelector } from "@/shared/lib/store-hooks";

/**
 * The proxy blocks signed-out visitors before render. This covers the rest:
 *  - the session ends while a protected page is open (refresh failed,
 *    signed out from another device, signed out here) -> /login, with a
 *    toast and a cleared cache when the API (not this tab) ended it
 *  - signed in but a required contact (email, for now) isn't verified
 *    -> /verify, then back here. Phone is optional, so it never redirects.
 * Renders nothing.
 */
export function SessionGuard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const status = useAppSelector(selectSessionStatus);
  const endedRemotely = useAppSelector(selectSessionEndedRemotely);
  const needsVerification = useAppSelector(selectNeedsVerification);

  useEffect(() => {
    if (!isProtectedPath(pathname)) return;
    if (status === "anonymous") {
      if (endedRemotely) {
        // The id stops a duplicate toast if this effect runs twice.
        toast.info("You were signed out of this device.", { id: "session-ended" });
        // Drop the old user's cached data, as the sign-out button does.
        dispatch(baseApi.util.resetApiState());
      }
      router.replace(loginPathFor(pathname));
    } else if (needsVerification && pathname !== verifyPath) {
      router.replace(verifyPathFor(pathname));
    }
  }, [status, endedRemotely, needsVerification, pathname, router, dispatch]);

  return null;
}
