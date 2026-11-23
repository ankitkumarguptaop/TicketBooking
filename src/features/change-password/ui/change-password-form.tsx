"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Controller, useForm } from "react-hook-form";

import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";
import { ResendCodeButton } from "@/shared/ui/resend-code-button";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useChangePasswordMutation } from "../api/change-password-api";
import { changePasswordSchema, type ChangePasswordValues } from "../model/change-password-schema";

type Props = {
  /** ISO date: when "Resend code" unlocks. */
  resendAvailableAt: string;
  isResending: boolean;
  onResend: () => void;
  onChanged: () => void;
};

const codeLength = 6;
// Fixed positions 0-5 that never reorder, so using them as keys is safe here.
const slotPositions = Array.from({ length: codeLength }, (_, position) => position);

/** The emailed code plus the new password, in one submit. */
export function ChangePasswordForm({ resendAvailableAt, isResending, onResend, onChanged }: Props) {
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { code: "", newPassword: "", confirmPassword: "" },
  });

  async function handleSubmit({ code, newPassword }: ChangePasswordValues) {
    const result = await changePassword({ code, newPassword });
    if ("error" in result) {
      // A wrong code costs an attempt: clear it, keep the typed password.
      form.resetField("code");
      return;
    }
    onChanged();
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <Controller
          control={form.control}
          name="code"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || Boolean(error)}>
              <FieldLabel htmlFor="change-password-code" className="text-xs">
                Code from the email
              </FieldLabel>
              <InputOTP
                id="change-password-code"
                maxLength={codeLength}
                pattern={REGEXP_ONLY_DIGITS}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
                aria-invalid={fieldState.invalid || Boolean(error)}
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
        {error && <FieldError>{getErrorMessage(error)}</FieldError>}
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving…" : "Change password"}
        </Button>
        <div className="flex justify-center">
          <ResendCodeButton availableAt={resendAvailableAt} isSending={isResending} onResend={onResend} />
        </div>
      </FieldGroup>
    </form>
  );
}
