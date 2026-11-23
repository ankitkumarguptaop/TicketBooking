"use client";

import { useRouter } from "next/navigation";

import { sessionEnded } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";
import { useAppDispatch } from "@/shared/lib/store-hooks";
import { cn } from "@/shared/lib/utils";

import { useSignOutMutation } from "../api/sign-out-api";

type Props = {
  className?: string;
};

export function SignOutButton({ className }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signOut, { isLoading }] = useSignOutMutation();

  async function handleClick() {
    // Clear local state even if the request fails (e.g. offline): the user asked
    // to leave, and the server session will expire on its own.
    await signOut();
    dispatch(sessionEnded());
    // Drop every cached response so the next user never sees this user's data.
    dispatch(baseApi.util.resetApiState());
    router.push("/login");
  }

  return (
    <button type="button" disabled={isLoading} onClick={handleClick} className={cn("text-left", className)}>
      {isLoading ? "Signing out…" : "Sign out"}
    </button>
  );
}
