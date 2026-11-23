import type { Metadata } from "next";

import { VerifyPanel } from "@/widgets/verify-panel";

export const metadata: Metadata = {
  title: "Verify your account",
};

export default function VerifyPage() {
  return <VerifyPanel />;
}
