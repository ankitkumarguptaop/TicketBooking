"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sessionStarted } from "@/entities/user";
import { getErrorMessage } from "@/shared/api/get-error-message";
import { useAppDispatch } from "@/shared/lib/store-hooks";
import { Button } from "@/shared/ui/button";
import { FieldError, FieldGroup } from "@/shared/ui/field";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useRegisterMutation } from "../api/auth-api";
import { registerSchema, type RegisterValues } from "../model/register-schema";

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", confirmPassword: "" },
  });

  async function handleSubmit({ name, email, phone, password }: RegisterValues) {
    const result = await register({ name, email, phone, password });
    if ("data" in result && result.data) {
      dispatch(sessionStarted(result.data.user));
      toast.success("Your account is ready");
      router.push("/");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
      <FieldGroup className="gap-5">
        <TextFormField
          control={form.control}
          name="name"
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
        {error && <FieldError>{getErrorMessage(error)}</FieldError>}
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account…" : "Create account"}
        </Button>
      </FieldGroup>
    </form>
  );
}
