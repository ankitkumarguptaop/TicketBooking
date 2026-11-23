import type { Metadata } from "next";
import { Suspense } from "react";

import { RegisterVerifyPanel, VerifyPanelSkeleton } from "@/widgets/verify-panel";

export const metadata: Metadata = {
  title: "Verify your email",
};

export default function RegisterVerifyPage() {
  return (
    <Suspense fallback={<VerifyPanelSkeleton />}>
      <RegisterVerifyPanel />
    </Suspense>
  );
}
