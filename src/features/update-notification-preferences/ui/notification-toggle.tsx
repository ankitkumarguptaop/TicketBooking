"use client";

import { toast } from "sonner";

import type { NotificationPreferenceKey } from "@/entities/user";
import { Switch } from "@/shared/ui/switch";

import { useUpdateNotificationPreferenceMutation } from "../api/notification-preferences-api";

type Props = {
  preferenceKey: NotificationPreferenceKey;
  enabled: boolean;
  label: string;
  description: string;
};

export function NotificationToggle({ preferenceKey, enabled, label, description }: Props) {
  const [updatePreference] = useUpdateNotificationPreferenceMutation();
  const switchId = `notification-${preferenceKey}`;
  const descriptionId = `${switchId}-description`;

  async function handleChange(next: boolean) {
    const result = await updatePreference({ key: preferenceKey, enabled: next });
    if ("error" in result) toast.error(`Couldn't update “${label}”. Please try again.`);
  }

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <label htmlFor={switchId} className="text-xs font-semibold">
          {label}
        </label>
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch id={switchId} checked={enabled} onCheckedChange={handleChange} aria-describedby={descriptionId} />
    </div>
  );
}
