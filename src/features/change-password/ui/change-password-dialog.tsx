"use client";

import { useState } from "react";
import { toast } from "sonner";

import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { FieldError } from "@/shared/ui/field";

import { useSendChangePasswordCodeMutation } from "../api/change-password-api";
import { ChangePasswordForm } from "./change-password-form";

type Props = {
  /** The account's email, shown so the user knows where to look. */
  email: string;
};

/** "Change password" button -> dialog: send a code to the email, then code + new password. */
export function ChangePasswordDialog({ email }: Props) {
  const [open, setOpen] = useState(false);
  const [sendCode, send] = useSendChangePasswordCodeMutation();

  function handleOpenChange(next: boolean) {
    setOpen(next);
    // Each opening starts at "Send code" again.
    if (!next) send.reset();
  }

  function handleChanged() {
    handleOpenChange(false);
    toast.success("Password changed. Your other devices were signed out");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Change password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            {send.data ? (
              <>
                Enter the code we sent to <span className="font-semibold text-foreground">{email}</span>. It expires in
                10 minutes.
              </>
            ) : (
              <>
                To confirm it&apos;s you, we&apos;ll send a 6-digit code to{" "}
                <span className="font-semibold text-foreground">{email}</span>.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {send.data ? (
          <ChangePasswordForm
            resendAvailableAt={send.data.resendAvailableAt}
            isResending={send.isLoading}
            onResend={() => sendCode()}
            onChanged={handleChanged}
          />
        ) : (
          <div className="flex flex-col gap-4">
            {send.error && <FieldError>{getErrorMessage(send.error)}</FieldError>}
            <Button size="lg" className="w-full" disabled={send.isLoading} onClick={() => sendCode()}>
              {send.isLoading ? "Sending…" : "Send code"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
