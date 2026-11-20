import { SectionCard } from "@/shared/ui/section-card";

import { NotificationSettings } from "./notification-settings";

export function NotificationSettingsCard() {
  return (
    <SectionCard id="notifications" title="Notifications">
      <NotificationSettings />
    </SectionCard>
  );
}
