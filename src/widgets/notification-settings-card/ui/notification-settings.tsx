"use client";

import { useGetNotificationPreferencesQuery, type NotificationPreferenceKey } from "@/entities/user";
import { NotificationToggle } from "@/features/update-notification-preferences";
import { LoadError } from "@/shared/ui/load-error";

import { NotificationSettingsSkeleton } from "./notification-settings-skeleton";

const options: { key: NotificationPreferenceKey; label: string; description: string }[] = [
  {
    key: "bookingUpdates",
    label: "Booking updates",
    description: "Confirmation, cancellation and refund messages by email and in-app",
  },
  { key: "showReminders", label: "Show reminders", description: "A reminder 2 hours before each show" },
  { key: "offers", label: "Offers and new releases", description: "Occasional emails about new movies in your city" },
];

export function NotificationSettings() {
  const { data: preferences, isLoading, isError, refetch } = useGetNotificationPreferencesQuery();

  if (isLoading) return <NotificationSettingsSkeleton rows={options.length} />;
  if (isError || !preferences) {
    return <LoadError message="We couldn’t load your notification settings." onRetry={refetch} />;
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {options.map((option) => (
        <NotificationToggle
          key={option.key}
          preferenceKey={option.key}
          enabled={preferences[option.key]}
          label={option.label}
          description={option.description}
        />
      ))}
    </div>
  );
}
