"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorCode, getErrorMessage } from "@/shared/api/get-error-message";
import { getSafeReturnPath, registerVerifyPathFor } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { FieldError, FieldGroup } from "@/shared/ui/field";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useRegisterMutation } from "../api/auth-api";
import { registerSchema, type RegisterValues } from "../model/register-schema";

const emailTakenCode = "IDENTITY_EMAIL_ALREADY_REGISTERED";

export function RegisterForm() {
  const router = useRouter();
  const [register, { isLoading, error }] = useRegisterMutation();
  // Shown on the email field itself, so skip the general error below.
  const emailTaken = getErrorCode(error) === emailTakenCode;

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", phone: "", password: "", confirmPassword: "" },
  });

  async function handleSubmit({ fullName, email, phone, password }: RegisterValues) {
    const result = await register({ fullName, email, phone, password });
    if ("data" in result && result.data) {
      toast.success("Account created. Now verify your email");
      // No session: the API set a short-lived verification cookie instead.
      // Verify, then sign in, then continue to ?next (kept through each step).
      router.replace(registerVerifyPathFor(getSafeReturnPath(new URLSearchParams(window.location.search).get("next"))));
    } else if (getErrorCode(result.error) === emailTakenCode) {
      form.setError("email", { message: "An account with this email already exists" }, { shouldFocus: true });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <TextFormField
          control={form.control}
          name="fullName"
          label="Full name"
          autoComplete="name"
        />
        <TextFormField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <TextFormField
          control={form.control}
          name="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          description="We'll send booking updates to this number."
        />
        <TextFormField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          description="At least 8 characters, with a letter and a number."
        />
        <TextFormField
          control={form.control}
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
        />
        {error && !emailTaken && <FieldError>{getErrorMessage(error)}</FieldError>}
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account…" : "Create account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
