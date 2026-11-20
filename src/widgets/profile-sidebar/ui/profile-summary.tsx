"use client";

import { useGetProfileQuery, UserAvatar } from "@/entities/user";
import { Badge } from "@/shared/ui/badge";
import { LoadError } from "@/shared/ui/load-error";

import { ProfileSummarySkeleton } from "./profile-summary-skeleton";

export function ProfileSummary() {
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();

  if (isLoading) return <ProfileSummarySkeleton />;
  if (isError || !profile) return <LoadError message="We couldn’t load your profile." onRetry={refetch} />;

  const stats = [
    { label: "Bookings", value: profile.stats.bookings },
    { label: "Reviews", value: profile.stats.reviews },
    { label: "Since", value: profile.stats.memberSince },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <UserAvatar name={profile.name} className="mb-2 size-22 text-3xl" />
        <p className="font-heading text-xl font-bold">{profile.name}</p>
        <p className="text-xs text-muted-foreground">{profile.email}</p>
        {profile.emailVerified && (
          <Badge className="mt-1 bg-success/15 text-[0.625rem] font-semibold text-success">Email verified</Badge>
        )}
      </div>
      <dl className="grid w-full grid-cols-3 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-0.5">
            <dt className="text-[0.625rem] text-muted-foreground">{stat.label}</dt>
            <dd className="text-base font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
