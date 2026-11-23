import type { Metadata } from "next";

import { RegisterVerifyPanel } from "@/widgets/verify-panel";

export const metadata: Metadata = {
  title: "Verify your email",
};

export default function RegisterVerifyPage() {
  return <RegisterVerifyPanel />;
}
