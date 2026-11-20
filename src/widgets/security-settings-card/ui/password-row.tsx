"use client";

import { toast } from "sonner";

import { useGetProfileQuery } from "@/entities/user";
import { formatRelativeTime } from "@/shared/lib/format-relative-time";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

export function PasswordRow() {
  const { data: profile, fulfilledTimeStamp } = useGetProfileQuery();

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold">Password</p>
        {profile && fulfilledTimeStamp ? (
          <p className="text-xs text-muted-foreground">
            Last changed {formatRelativeTime(profile.passwordChangedAt, fulfilledTimeStamp)}
          </p>
        ) : (
          <Skeleton className="h-3 w-32" />
        )}
      </div>
      {/* The change-password flow isn't designed yet. */}
      <Button variant="outline" size="sm" onClick={() => toast.info("Changing your password is coming soon.")}>
        Change password
      </Button>
    </div>
  );
}
