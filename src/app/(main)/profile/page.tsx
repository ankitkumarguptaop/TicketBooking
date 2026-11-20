import type { Metadata } from "next";

import { Container } from "@/shared/ui/container";
import { NotificationSettingsCard } from "@/widgets/notification-settings-card";
import { PersonalDetailsCard } from "@/widgets/personal-details-card";
import { ProfileSidebar } from "@/widgets/profile-sidebar";
import { SecuritySettingsCard } from "@/widgets/security-settings-card";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <Container className="grid items-start gap-6 py-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8">
      <ProfileSidebar />
      <div className="flex flex-col gap-6">
        <PersonalDetailsCard />
        <NotificationSettingsCard />
        <SecuritySettingsCard />
      </div>
    </Container>
  );
}
