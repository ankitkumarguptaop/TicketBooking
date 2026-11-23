"use client";

import { io } from "next/cache";
import { use } from "react";
import { useGetMeQuery, UserAvatar, VerifiedBadge } from "@/entities/user";
import { VerifyPhoneDialog } from "@/features/verify-otp";
import { Badge } from "@/shared/ui/badge";
import { LoadError } from "@/shared/ui/load-error";

import { ProfileSummarySkeleton } from "./profile-summary-skeleton";

export function ProfileSummary() {
  // RTK Query reads the clock when the query starts. Keep that out of the
  // prerendered static shell; the parent's <Suspense> shows the skeleton.
  use(io());
  const { data: user, isLoading, isError, refetch } = useGetMeQuery();

  if (isLoading) return <ProfileSummarySkeleton />;
  if (isError || !user) return <LoadError message="We couldn’t load your profile." onRetry={refetch} />;

  const contacts = [
    { label: "Email", value: user.email, verified: user.emailVerified },
    { label: "Phone", value: user.phone, verified: user.phoneVerified },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <UserAvatar name={user.fullName} className="mb-2 size-22 text-3xl" />
        <p className="font-heading text-xl font-bold">{user.fullName}</p>
        <p className="text-xs text-muted-foreground">Member since {new Date(user.createdAt).getFullYear()}</p>
        {user.role === "ADMIN" && <Badge className="mt-1 text-[0.625rem] font-semibold">Admin</Badge>}
      </div>
      <dl className="flex w-full flex-col gap-2 text-xs">
        {contacts.map((contact) => (
          <div key={contact.label} className="flex items-center justify-between gap-2">
            <dt className="sr-only">{contact.label}</dt>
            <dd className="truncate text-muted-foreground">{contact.value}</dd>
            <dd className="flex items-center gap-2">
              <VerifiedBadge verified={contact.verified} />
              {/* Only phone can be unverified here: email is verified at sign-up. */}
              {contact.label === "Phone" && !contact.verified && <VerifyPhoneDialog phone={contact.value} />}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
