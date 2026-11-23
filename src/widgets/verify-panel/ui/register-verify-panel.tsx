"use client";

import Link from "next/link";
import { useState } from "react";

import { VerifiedBadge } from "@/entities/user";
import { useGetRegistrationVerificationStatusQuery, VerifyOtpForm } from "@/features/verify-otp";
import { getErrorCode } from "@/shared/api/get-error-message";
import { getSafeReturnPath, loginPathFor } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { LoadError } from "@/shared/ui/load-error";
import { Stepper } from "@/shared/ui/stepper";

import { VerifyPanelSkeleton } from "./verify-panel-skeleton";

/** Same three steps as the register page, so sign-up reads as one flow. */
const steps = ["Account", "Verify email", "Verify phone (optional)"];
const expiredCode = "AUTH_VERIFICATION_EXPIRED";

/** Where the user was heading before sign-up (?next=...). Read on demand, so no Suspense is needed. */
function signInPath(): string {
  return loginPathFor(getSafeReturnPath(new URLSearchParams(window.location.search).get("next")));
}

/**
 * Sign-up steps 2 and 3, before the first sign-in: email code (required),
 * then phone code (optional). Ends with "Sign in".
 */
export function RegisterVerifyPanel() {
  const { data: status, isLoading, error, refetch } = useGetRegistrationVerificationStatusQuery();
  // Phone is optional: "Skip for now" just ends the flow here.
  const [phoneSkipped, setPhoneSkipped] = useState(false);

  if (isLoading) return <VerifyPanelSkeleton />;

  // The 30-minute verification cookie ran out (or never existed). Signing in
  // with the right password issues a new one and comes back here.
  if (getErrorCode(error) === expiredCode) {
    return (
      <section role="alert" className="flex flex-col gap-4">
        <h1 className="font-heading text-3xl font-bold tracking-tight">This link has expired</h1>
        <p className="text-sm text-muted-foreground">Sign in with your email and password to finish verifying.</p>
        <Button size="lg" className="w-full" onClick={() => window.location.assign(signInPath())}>
          Go to sign in
        </Button>
      </section>
    );
  }
  if (error || !status) return <LoadError message="We couldn’t load your sign-up." onRetry={refetch} />;

  const channel = !status.emailVerified ? "email" : !status.phoneVerified && !phoneSkipped ? "phone" : null;

  return (
    <section aria-labelledby="register-verify-heading" className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Stepper steps={steps} currentStep={channel === "email" ? 1 : 2} />
        <h1 id="register-verify-heading" className="font-heading text-3xl font-bold tracking-tight">
          {channel === "email" ? "Verify your email" : channel === "phone" ? "Verify your phone" : "You're all set"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {channel === "email"
            ? "Confirm your email to finish creating your account."
            : channel === "phone"
              ? "Optional: we'll text booking updates to a verified number. You can also do this later from your profile."
              : "Your account is ready. Sign in to start booking."}
        </p>
        <dl className="flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between gap-3">
            <dt className="truncate">{status.email}</dt>
            <dd>
              <VerifiedBadge verified={status.emailVerified} />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="truncate">{status.phone}</dt>
            <dd>
              <VerifiedBadge verified={status.phoneVerified} />
            </dd>
          </div>
        </dl>
      </header>

      {channel ? (
        <div className="flex flex-col gap-3">
          {/* key: a fresh form (empty code, new send state) when moving from email to phone. */}
          <VerifyOtpForm
            key={channel}
            scope="registration"
            channel={channel}
            contact={channel === "email" ? status.email : status.phone}
          />
          {channel === "phone" && (
            <Button variant="ghost" size="lg" className="w-full" onClick={() => setPhoneSkipped(true)}>
              Skip for now
            </Button>
          )}
        </div>
      ) : (
        <Button asChild size="lg" className="w-full">
          <Link href={signInPath()} replace>
            Sign in
          </Link>
        </Button>
      )}
    </section>
  );
}
