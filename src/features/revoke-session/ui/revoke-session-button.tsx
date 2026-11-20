"use client";

import { toast } from "sonner";

import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";

import { useRevokeSessionMutation } from "../api/revoke-session-api";

type Props = {
  sessionId: string;
  /** Read by screen readers, e.g. "Safari on iPhone". */
  deviceName: string;
};

export function RevokeSessionButton({ sessionId, deviceName }: Props) {
  const [revokeSession, { isLoading }] = useRevokeSessionMutation();

  async function handleClick() {
    const result = await revokeSession(sessionId);
    if ("error" in result) toast.error(getErrorMessage(result.error));
    else toast.success(`Signed out of ${deviceName}`);
  }

  return (
    <Button variant="outline" size="sm" disabled={isLoading} onClick={handleClick}>
      {isLoading ? "Signing out…" : "Sign out"}
      <span className="sr-only"> of {deviceName}</span>
    </Button>
  );
}
