"use client";

import Link from "next/link";
import { useState } from "react";

import { RequestResetForm, ResetPasswordForm } from "@/features/reset-password";
import { Button } from "@/shared/ui/button";

type CodeSent = {
  email: string;
  resendAvailableAt: string;
};

/** Forgot password: email -> code + new password -> /login. */
export function ForgotPasswordPanel() {
  // null = step 1 (ask for the email). Set = step 2 (enter the code).
  const [sent, setSent] = useState<CodeSent | null>(null);

  return (
    <section aria-labelledby="forgot-heading" className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 id="forgot-heading" className="font-heading text-3xl font-bold tracking-tight">
          {sent ? "Check your email" : "Forgot your password?"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {sent ? (
            <>
              If <span className="font-semibold text-foreground">{sent.email}</span> has an account, we sent it a
              6-digit code. It expires in 10 minutes.
            </>
          ) : (
            "Enter your account's email and we'll send you a code to set a new password."
          )}
        </p>
      </header>

      {sent ? (
        <div className="flex flex-col gap-3">
          {/* key: a different email gets a fresh form. */}
          <ResetPasswordForm key={sent.email} email={sent.email} resendAvailableAt={sent.resendAvailableAt} />
          <Button variant="ghost" size="lg" className="w-full" onClick={() => setSent(null)}>
            Use a different email
          </Button>
        </div>
      ) : (
        <RequestResetForm onSent={(email, resendAvailableAt) => setSent({ email, resendAvailableAt })} />
      )}

      <p className="text-center text-xs text-muted-foreground">
        Remembered it?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}
