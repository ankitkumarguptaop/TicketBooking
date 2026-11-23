"use client";

import { useEffect, useState } from "react";

import { Button } from "@/shared/ui/button";

type Props = {
  /** ISO date from the API: when a new code may be requested. Unknown = allow now. */
  availableAt: string | undefined;
  isSending: boolean;
  onResend: () => void;
};

function secondsUntil(iso: string | undefined): number {
  if (!iso) return 0;
  return Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 1000));
}

/** "Resend code in 42s", then a clickable "Resend code". The API enforces the same wait. */
export function ResendCodeButton({ availableAt, isSending, onResend }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(availableAt));

  useEffect(() => {
    // Re-sync when a new code moves availableAt. The interval just ticks the label.
    const tick = () => setSecondsLeft(secondsUntil(availableAt));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [availableAt]);

  const waiting = secondsLeft > 0;

  return (
    <Button type="button" variant="link" size="sm" disabled={waiting || isSending} onClick={onResend}>
      {isSending ? "Sending…" : waiting ? `Resend code in ${secondsLeft}s` : "Resend code"}
    </Button>
  );
}
