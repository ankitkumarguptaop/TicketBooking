import { Suspense } from "react";

import { Separator } from "@/shared/ui/separator";

import { ProfileSectionNav } from "./profile-section-nav";
import { ProfileSummary } from "./profile-summary";
import { ProfileSummarySkeleton } from "./profile-summary-skeleton";

export function ProfileSidebar() {
  return (
    <aside aria-label="Your profile" className="flex h-fit flex-col gap-4 rounded-xl bg-card p-4 lg:sticky lg:top-24">
      <div className="px-2 pt-4">
        <Suspense fallback={<ProfileSummarySkeleton />}>
          <ProfileSummary />
        </Suspense>
      </div>
      <Separator />
      <ProfileSectionNav />
    </aside>
  );
}
