"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sessionStarted } from "@/entities/user";
import { getErrorMessage } from "@/shared/api/get-error-message";
import { useAppDispatch } from "@/shared/lib/store-hooks";
import { Button } from "@/shared/ui/button";
import { FieldError, FieldGroup } from "@/shared/ui/field";
import { TextFormField } from "@/shared/ui/text-form-field";

import { useLoginMutation } from "../api/auth-api";
import { loginSchema, type LoginValues } from "../model/login-schema";
import { RememberMeField } from "./remember-me-field";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  async function handleSubmit(values: LoginValues) {
    const result = await login(values);
    if ("data" in result && result.data) {
      dispatch(sessionStarted(result.data.user));
      toast.success(`Welcome back, ${result.data.user.name}`);
      router.push("/");
    }
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
        <TextFormField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <div className="flex items-center justify-between gap-4">
          <RememberMeField control={form.control} />
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline"
          >
            Forgot password?
          </Link>
        </div>
        {error && <FieldError>{getErrorMessage(error)}</FieldError>}
        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
      </FieldGroup>
    </form>
  );
}
