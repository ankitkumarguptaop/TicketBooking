import { Suspense } from "react";

import { SectionCard } from "@/shared/ui/section-card";

import { PersonalDetails } from "./personal-details";
import { PersonalDetailsSkeleton } from "./personal-details-skeleton";

export function PersonalDetailsCard() {
  return (
    <SectionCard id="personal-details" title="Personal details">
      <Suspense fallback={<PersonalDetailsSkeleton />}>
        <PersonalDetails />
      </Suspense>
    </SectionCard>
  );
}
