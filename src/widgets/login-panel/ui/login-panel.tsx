import Link from "next/link";

import { LoginForm } from "@/features/auth-by-email";
import { GoogleSignInButton } from "@/features/auth-by-google";

export function LoginPanel() {
  return (
    <section aria-labelledby="login-heading" className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 id="login-heading" className="font-heading text-3xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to book tickets and manage your bookings
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <LoginForm />
        <p className="text-center text-xs text-muted-foreground">or</p>
        <GoogleSignInButton />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        New here?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline"
        >
          Create an account
        </Link>
      </p>
    </section>
  );
}
