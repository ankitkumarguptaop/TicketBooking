"use client";

import { toast } from "sonner";

import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";

import { useRevokeOtherSessionsMutation } from "../api/revoke-session-api";

type Props = {
  /** Every session except this device. The button is disabled when empty. */
  otherSessionIds: string[];
};

export function RevokeOtherSessionsButton({ otherSessionIds }: Props) {
  const [revokeOtherSessions, { isLoading }] = useRevokeOtherSessionsMutation();

  async function handleClick() {
    const result = await revokeOtherSessions(otherSessionIds);
    if ("error" in result) toast.error(getErrorMessage(result.error));
    else toast.success("Signed out of all other devices");
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isLoading || otherSessionIds.length === 0}
      onClick={handleClick}
      className="border-destructive/60 text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      {isLoading ? "Signing out…" : "Sign out of all devices"}
    </Button>
  );
}
