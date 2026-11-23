"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useGetMeQuery, VerifiedBadge } from "@/entities/user";
import { SignOutButton } from "@/features/sign-out";
import { VerifyOtpForm } from "@/features/verify-otp";
import { getSafeReturnPath } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { LoadError } from "@/shared/ui/load-error";
import { Stepper } from "@/shared/ui/stepper";

import { VerifyPanelSkeleton } from "./verify-panel-skeleton";

const steps = ["Verify email", "Verify phone (optional)"];

/** Where the user was heading before being sent here (?next=...). Read on demand, so no Suspense is needed. */
function returnPath(): string {
  return getSafeReturnPath(new URLSearchParams(window.location.search).get("next"));
}

/**
 * After the first sign-in: prove the email (required), then the phone
 * (optional, can be skipped). Also reachable later from the profile.
 */
export function VerifyPanel() {
  const router = useRouter();
  const { data: user, isLoading, isError, refetch } = useGetMeQuery();
  const allVerified = user ? user.emailVerified && user.phoneVerified : false;

  useEffect(() => {
    // Nothing left to verify (just now, or already): continue.
    if (allVerified) router.replace(returnPath());
  }, [allVerified, router]);

  if (isLoading) return <VerifyPanelSkeleton />;
  if (isError || !user) return <LoadError message="We couldn’t load your account." onRetry={refetch} />;

  // Email first, then phone. The cache update after each confirm moves us on.
  const channel = !user.emailVerified ? "email" : !user.phoneVerified ? "phone" : null;

  return (
    <section aria-labelledby="verify-heading" className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Stepper steps={steps} currentStep={channel === "email" ? 0 : 1} />
        <h1 id="verify-heading" className="font-heading text-3xl font-bold tracking-tight">
          {channel === "phone" ? "Verify your phone" : "Verify your email"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {channel === "phone"
            ? "Optional: we'll text booking updates to a verified number. You can do this later from your profile."
            : "Confirm your email so we can send your tickets."}
        </p>
        <dl className="flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between gap-3">
            <dt className="truncate">{user.email}</dt>
            <dd>
              <VerifiedBadge verified={user.emailVerified} />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="truncate">{user.phone}</dt>
            <dd>
              <VerifiedBadge verified={user.phoneVerified} />
            </dd>
          </div>
        </dl>
      </header>

      {channel ? (
        <div className="flex flex-col gap-3">
          {/* key: a fresh form (empty code, new send state) when moving from email to phone. */}
          <VerifyOtpForm key={channel} scope="account" channel={channel} contact={channel === "email" ? user.email : user.phone} />
          {channel === "phone" && (
            <Button variant="ghost" size="lg" className="w-full" onClick={() => router.replace(returnPath())}>
              Skip for now
            </Button>
          )}
        </div>
      ) : (
        <p role="status" className="text-sm text-success">
          All set. Taking you in…
        </p>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Wrong account? <SignOutButton className="font-semibold text-primary hover:underline" />
      </p>
    </section>
  );
}
