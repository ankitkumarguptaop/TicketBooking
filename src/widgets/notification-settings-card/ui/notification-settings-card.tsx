import { Suspense } from "react";

import { SectionCard } from "@/shared/ui/section-card";

import { NotificationSettings } from "./notification-settings";
import { NotificationSettingsSkeleton } from "./notification-settings-skeleton";

/** Must match the number of options in notification-settings.tsx, so nothing jumps on load. */
const optionCount = 3;

export function NotificationSettingsCard() {
  return (
    <SectionCard id="notifications" title="Notifications">
      <Suspense fallback={<NotificationSettingsSkeleton rows={optionCount} />}>
        <NotificationSettings />
      </Suspense>
    </SectionCard>
  );
}
