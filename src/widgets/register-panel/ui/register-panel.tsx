import Link from "next/link";

import { RegisterForm } from "@/features/auth-by-email";
import { GoogleSignInButton } from "@/features/auth-by-google";

export function RegisterPanel() {
  return (
    <section aria-labelledby="register-heading" className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 id="register-heading" className="font-heading text-3xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Book tickets and keep all your bookings in one place
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <RegisterForm />
        <p className="text-center text-xs text-muted-foreground">or</p>
        <GoogleSignInButton />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
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
