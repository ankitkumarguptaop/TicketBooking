"use client";

import { io } from "next/cache";
import { use } from "react";
import { getDeviceLabel, LoginSessionRow, useGetLoginSessionsQuery } from "@/entities/user";
import { RevokeOtherSessionsButton, RevokeSessionButton } from "@/features/revoke-session";
import { LoadError } from "@/shared/ui/load-error";
import { Skeleton } from "@/shared/ui/skeleton";

export function ActiveSessions() {
  // RTK Query reads the clock when the query starts. Keep that out of the
  // prerendered static shell; the parent's <Suspense> shows the skeleton.
  use(io());
  const { data: sessions, fulfilledTimeStamp, isLoading, isError, refetch } = useGetLoginSessionsQuery();

  if (isLoading) {
    return (
      <div aria-busy aria-label="Loading active sessions" className="flex flex-col gap-3 py-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }
  if (isError || !sessions || !fulfilledTimeStamp) {
    return <LoadError message="We couldn’t load your active sessions." onRetry={refetch} />;
  }

  const otherSessionIds = sessions.filter((session) => !session.current).map((session) => session.id);

  return (
    <>
      <ul className="flex flex-col divide-y divide-border border-b border-border">
        {sessions.map((session) => (
          <li key={session.id}>
            {/* Every row uses the time the list arrived, not a fresh Date.now(), so renders stay pure. */}
            <LoginSessionRow session={session} now={fulfilledTimeStamp}>
              <RevokeSessionButton sessionId={session.id} deviceName={getDeviceLabel(session)} />
            </LoginSessionRow>
          </li>
        ))}
      </ul>
      {otherSessionIds.length === 0 && (
        <p className="pt-3 text-xs text-muted-foreground">This is the only device signed in to your account.</p>
      )}
      <div className="flex justify-end pt-3">
        <RevokeOtherSessionsButton otherSessionIds={otherSessionIds} />
      </div>
    </>
  );
}
