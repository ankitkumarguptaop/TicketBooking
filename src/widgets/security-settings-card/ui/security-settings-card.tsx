import { SectionCard } from "@/shared/ui/section-card";

import { ActiveSessions } from "./active-sessions";
import { PasswordRow } from "./password-row";

export function SecuritySettingsCard() {
  return (
    <SectionCard id="security" title="Security" className="gap-0">
      <div className="mt-4 border-b border-border">
        <PasswordRow />
      </div>
      <h3 className="pt-3 text-xs font-medium text-muted-foreground">Active sessions</h3>
      <ActiveSessions />
    </SectionCard>
  );
}
