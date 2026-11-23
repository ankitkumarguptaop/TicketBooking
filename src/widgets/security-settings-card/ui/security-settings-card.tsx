import { Suspense } from "react";

import { SectionCard } from "@/shared/ui/section-card";
import { Skeleton } from "@/shared/ui/skeleton";

import { ActiveSessions } from "./active-sessions";
import { PasswordRow } from "./password-row";

export function SecuritySettingsCard() {
  return (
    <SectionCard id="security" title="Security" className="gap-0">
      <div className="mt-4 border-b border-border">
        <Suspense fallback={<Skeleton className="my-3 h-8 w-full" />}>
          <PasswordRow />
        </Suspense>
      </div>
      <h3 className="pt-3 text-xs font-medium text-muted-foreground">Active sessions</h3>
      <Suspense
        fallback={
          <div aria-busy aria-label="Loading active sessions" className="flex flex-col gap-3 py-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        }
      >
        <ActiveSessions />
      </Suspense>
    </SectionCard>
  );
}
