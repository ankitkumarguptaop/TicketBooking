"use client";

import { io } from "next/cache";
import { use, useEffect } from "react";

import { readSavedUser, savedUserLoaded, useGetMeQuery } from "@/entities/user";
import { useAppDispatch } from "@/shared/lib/store-hooks";

/**
 * Restores the session on page load, in two steps:
 * 1. the saved copy from localStorage, so the header shows the user at once;
 * 2. GET /users/me, which confirms it (or signs the user out).
 * Renders nothing.
 */
export function SessionRestorer() {
  const dispatch = useAppDispatch();
  // RTK Query reads the clock when the query starts. Keep that out of the
  // prerendered static shell; the parent's <Suspense> shows the skeleton.
  use(io());
  useGetMeQuery();

  useEffect(() => {
    // In an effect, not during render: the server has no localStorage, and
    // reading it while rendering would make the HTML differ from the client.
    dispatch(savedUserLoaded(readSavedUser()));
  }, [dispatch]);

  return null;
}
