"use client";

import { useGetProfileQuery } from "@/entities/user";
import { ProfileForm } from "@/features/edit-profile";
import { LoadError } from "@/shared/ui/load-error";

import { PersonalDetailsSkeleton } from "./personal-details-skeleton";

export function PersonalDetails() {
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();

  if (isLoading) return <PersonalDetailsSkeleton />;
  if (isError || !profile) return <LoadError message="We couldn’t load your details." onRetry={refetch} />;

  // key: a fresh form when another profile loads, so its default values are never stale.
  return <ProfileForm key={profile.id} profile={profile} />;
}
