import type { Metadata } from "next";
import { Suspense } from "react";

import { VerifyPanel, VerifyPanelSkeleton } from "@/widgets/verify-panel";

export const metadata: Metadata = {
  title: "Verify your account",
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyPanelSkeleton />}>
      <VerifyPanel />
    </Suspense>
  );
}
