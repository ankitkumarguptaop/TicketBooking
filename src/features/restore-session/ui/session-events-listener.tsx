"use client";

import { io } from "next/cache";
import { use } from "react";

import { selectSessionStatus } from "@/entities/user";
import { useAppSelector } from "@/shared/lib/store-hooks";

import { useSessionEventsQuery } from "../api/session-events-api";

/**
 * Listens for "this session was signed out" from the API while signed in,
 * so a revoke on another device signs this one out right away.
 * Renders nothing.
 */
export function SessionEventsListener() {
  // RTK Query reads the clock even for a skipped query. Keep that out of the
  // prerendered static shell; the parent's <Suspense> renders nothing meanwhile.
  use(io());
  const status = useAppSelector(selectSessionStatus);
  useSessionEventsQuery(undefined, { skip: status !== "authenticated" });
  return null;
}
