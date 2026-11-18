import type { Metadata } from "next";

import { RegisterPanel } from "@/widgets/register-panel";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return <RegisterPanel />;
}
