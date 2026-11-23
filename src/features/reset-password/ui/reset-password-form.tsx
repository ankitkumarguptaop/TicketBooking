"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";
import { ResendCodeButton } from "@/shared/ui/resend-code-button";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useConfirmPasswordResetMutation, useRequestPasswordResetMutation } from "../api/reset-password-api";
import { resetPasswordSchema, type ResetPasswordValues } from "../model/reset-password-schema";

type Props = {
  email: string;
  /** ISO date from step 1: when "Resend code" unlocks. */
  resendAvailableAt: string;
};

const codeLength = 6;
// Fixed positions 0-5 that never reorder, so using them as keys is safe here.
const slotPositions = Array.from({ length: codeLength }, (_, position) => position);

/** Step 2: the emailed code plus the new password, in one submit. */
export function ResetPasswordForm({ email, resendAvailableAt }: Props) {
  const router = useRouter();
  const [confirmReset, confirm] = useConfirmPasswordResetMutation();
  const [requestReset, resend] = useRequestPasswordResetMutation();
  const [availableAt, setAvailableAt] = useState(resendAvailableAt);
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", newPassword: "", confirmPassword: "" },
  });

  async function handleResend() {
    confirm.reset();
    form.resetField("code");
    const result = await requestReset(email);
    if ("data" in result && result.data) {
      setAvailableAt(result.data.resendAvailableAt);
      toast.success("We sent a new code");
    }
  }

  async function handleSubmit({ code, newPassword }: ResetPasswordValues) {
    const result = await confirmReset({ email, code, newPassword });
    if ("error" in result) {
      // A wrong code costs an attempt: clear it, keep the typed password.
      form.resetField("code");
      return;
    }
    toast.success("Password changed. Sign in with your new password");
    router.replace("/login");
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <Controller
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || Boolean(confirm.error)}>
              <FieldLabel htmlFor="reset-code" className="text-xs">
                Code from the email
              </FieldLabel>
              <InputOTP
                id="reset-code"
                maxLength={codeLength}
                pattern={REGEXP_ONLY_DIGITS}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                value={field.value}
                onChange={field.onChange}
                disabled={confirm.isLoading}
                aria-invalid={fieldState.invalid || Boolean(confirm.error)}
              >
                <InputOTPGroup>
                  {slotPositions.map((position) => (
                    <InputOTPSlot key={position} index={position} className="size-11 text-base" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <TextFormField
          control={form.control}
          name="newPassword"
          label="New password"
          type="password"
          autoComplete="new-password"
          description="At least 8 characters, with a letter and a number."
        />
        <TextFormField
          control={form.control}
          name="confirmPassword"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
        />
        {(confirm.error ?? resend.error) && <FieldError>{getErrorMessage(confirm.error ?? resend.error)}</FieldError>}
        <Button type="submit" size="lg" className="w-full" disabled={confirm.isLoading}>
          {confirm.isLoading ? "Saving…" : "Reset password"}
        </Button>
        <div className="flex justify-center">
          <ResendCodeButton availableAt={availableAt} isSending={resend.isLoading} onResend={handleResend} />
        </div>
      </FieldGroup>
    </form>
  );
}
