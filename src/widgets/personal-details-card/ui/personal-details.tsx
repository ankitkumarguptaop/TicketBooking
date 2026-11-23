"use client";

import { io } from "next/cache";
import { use } from "react";
import { useGetMeQuery } from "@/entities/user";
import { ProfileForm } from "@/features/edit-profile";
import { LoadError } from "@/shared/ui/load-error";

import { PersonalDetailsSkeleton } from "./personal-details-skeleton";

export function PersonalDetails() {
  // RTK Query reads the clock when the query starts. Keep that out of the
  // prerendered static shell; the parent's <Suspense> shows the skeleton.
  use(io());
  const { data: user, isLoading, isError, refetch } = useGetMeQuery();

  if (isLoading) return <PersonalDetailsSkeleton />;
  if (isError || !user) return <LoadError message="We couldn’t load your details." onRetry={refetch} />;

  // key: a fresh form when another user loads, so its default values are never stale.
  return <ProfileForm key={user.id} user={user} />;
}
