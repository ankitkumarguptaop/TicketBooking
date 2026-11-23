"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getErrorMessage } from "@/shared/api/get-error-message";
import { Button } from "@/shared/ui/button";
import { FieldError, FieldGroup } from "@/shared/ui/field";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useRequestPasswordResetMutation } from "../api/reset-password-api";
import { requestResetSchema, type RequestResetValues } from "../model/request-reset-schema";

type Props = {
  /** Called once the API accepted the request: show the code step. */
  onSent: (email: string, resendAvailableAt: string) => void;
};

/** Step 1: which account? */
export function RequestResetForm({ onSent }: Props) {
  const [requestReset, { isLoading, error }] = useRequestPasswordResetMutation();
  const form = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: { email: "" },
  });

  async function handleSubmit({ email }: RequestResetValues) {
    const result = await requestReset(email);
    if ("data" in result && result.data) onSent(email, result.data.resendAvailableAt);
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <TextFormField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        {error && <FieldError>{getErrorMessage(error)}</FieldError>}
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending…" : "Send code"}
        </Button>
      </FieldGroup>
    </form>
  );
}
