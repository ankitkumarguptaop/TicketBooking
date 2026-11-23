"use client";

import { io } from "next/cache";
import { use } from "react";
import { useGetMeQuery } from "@/entities/user";
import { ChangePasswordDialog } from "@/features/change-password";
import { Skeleton } from "@/shared/ui/skeleton";

export function PasswordRow() {
  // RTK Query reads the clock when the query starts. Keep that out of the
  // prerendered static shell; the parent's <Suspense> shows the skeleton.
  use(io());
  const { data: user } = useGetMeQuery();

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      {/* "Last changed" needs a passwordChangedAt field the API doesn't have yet. */}
      <p className="text-xs font-semibold">Password</p>
      {/* The email comes from the same cached getMe as the rest of the profile. */}
      {user ? <ChangePasswordDialog email={user.email} /> : <Skeleton className="h-8 w-32 rounded-lg" />}
    </div>
  );
}
