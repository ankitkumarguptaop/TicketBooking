"use client";

import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";

import { VerifyOtpForm } from "./verify-otp-form";

type Props = {
  phone: string;
};

/**
 * For a signed-in user: verify the phone without leaving the page.
 * The confirm updates the cached user, so the badge behind the dialog
 * flips to "Verified" as soon as it closes.
 */
export function VerifyPhoneDialog({ phone }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-semibold">
          Verify<span className="sr-only"> phone number</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your phone</DialogTitle>
          <DialogDescription>We&apos;ll text booking updates to a verified number.</DialogDescription>
        </DialogHeader>
        {/* Rendered only while open (Radix unmounts closed content), so every
            opening starts fresh: no old code, no stale "code sent" state. */}
        <VerifyOtpForm scope="account" channel="phone" contact={phone} onVerified={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
