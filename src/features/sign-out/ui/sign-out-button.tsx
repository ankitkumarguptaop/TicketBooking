"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { sessionEnded } from "@/entities/user";
import { baseApi } from "@/shared/api/base-api";
import { getErrorMessage } from "@/shared/api/get-error-message";
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
    const result = await signOut();
    if ("error" in result) {
      toast.error(getErrorMessage(result.error));
      return;
    }
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
