"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorCode, getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";

import {
  useConfirmAccountCodeMutation,
  useConfirmRegistrationCodeMutation,
  useSendVerificationCodeMutation,
} from "../api/verify-otp-api";
import { otpLength, otpSchema, type OtpValues } from "../model/otp-schema";
import type { VerificationChannel, VerificationScope } from "../model/types";
import { ResendCodeButton } from "@/shared/ui/resend-code-button";

type Props = {
  scope: VerificationScope;
  channel: VerificationChannel;
  /** The user's own email or phone, shown before a code is sent. */
  contact: string;
  /** Called after the code is accepted, e.g. to close a dialog. */
  onVerified?: () => void;
};

const resendTooSoonCode = "IDENTITY_VERIFICATION_RESEND_TOO_SOON";
// Fixed positions 0-5 that never reorder, so using them as keys is safe here.
const slotPositions = Array.from({ length: otpLength }, (_, position) => position);

export function VerifyOtpForm({ scope, channel, contact, onVerified }: Props) {
  const [sendCode, send] = useSendVerificationCodeMutation();
  // Both hooks always run (hooks can't be conditional); the scope picks which one we use.
  const registrationConfirm = useConfirmRegistrationCodeMutation();
  const accountConfirm = useConfirmAccountCodeMutation();
  const [confirmCode, confirm] = scope === "registration" ? registrationConfirm : accountConfirm;
  const form = useForm<OtpValues>({ resolver: zodResolver(otpSchema), defaultValues: { code: "" } });

  const label = channel === "email" ? "email" : "phone number";
  // A code is on its way if the send worked, or the API says one went out
  // moments ago (e.g. the page was reloaded right after sending).
  const codeSent = Boolean(send.data) || getErrorCode(send.error) === resendTooSoonCode;

  async function requestCode() {
    form.reset();
    confirm.reset();
    await sendCode({ scope, channel });
  }

  async function handleSubmit({ code }: OtpValues) {
    const result = await confirmCode({ channel, code });
    if ("error" in result) {
      // Clear the boxes so the next attempt starts fresh.
      form.reset();
      return;
    }
    toast.success(channel === "email" ? "Email verified" : "Phone number verified");
    onVerified?.();
  }

  if (!codeSent) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          We&apos;ll send a 6-digit code to <span className="font-semibold text-foreground">{contact}</span>.
        </p>
        {send.error && <FieldError>{getErrorMessage(send.error)}</FieldError>}
        <Button size="lg" className="w-full" disabled={send.isLoading} onClick={requestCode}>
          {send.isLoading ? "Sending…" : "Send code"}
        </Button>
      </div>
    );
  }

  const inputId = `otp-${channel}`;
  const apiError = confirm.error ?? (getErrorCode(send.error) === resendTooSoonCode ? undefined : send.error);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="flex flex-col gap-5">
      <p className="text-sm text-muted-foreground">
        Enter the code we sent to your {label}{" "}
        <span className="font-semibold text-foreground">{send.data?.sentTo ?? contact}</span>. It expires in 10
        minutes.
      </p>
      <Controller
        control={form.control}
        name="code"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid || Boolean(apiError)}>
            <FieldLabel htmlFor={inputId} className="text-xs">
              Verification code
            </FieldLabel>
            <InputOTP
              id={inputId}
              maxLength={otpLength}
              pattern={REGEXP_ONLY_DIGITS}
              inputMode="numeric"
              // Lets phones offer the code from the SMS above the keyboard.
              autoComplete="one-time-code"
              autoFocus
              value={field.value}
              onChange={field.onChange}
              onComplete={() => form.handleSubmit(handleSubmit)()}
              disabled={confirm.isLoading}
              aria-invalid={fieldState.invalid || Boolean(apiError)}
            >
              <InputOTPGroup>
                {slotPositions.map((position) => (
                  <InputOTPSlot key={position} index={position} className="size-11 text-base" />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            {apiError && <FieldError>{getErrorMessage(apiError)}</FieldError>}
          </Field>
        )}
      />
      <Button type="submit" size="lg" className="w-full" disabled={confirm.isLoading}>
        {confirm.isLoading ? "Verifying…" : "Verify"}
      </Button>
      <div className="flex justify-center">
        <ResendCodeButton
          availableAt={send.data?.resendAvailableAt}
          isSending={send.isLoading}
          onResend={requestCode}
        />
      </div>
    </form>
  );
}
