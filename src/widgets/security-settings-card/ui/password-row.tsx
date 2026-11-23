"use client";

import { toast } from "sonner";

import { Button } from "@/shared/ui/button";

export function PasswordRow() {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      {/* "Last changed" needs a passwordChangedAt field the API doesn't have yet. */}
      <p className="text-xs font-semibold">Password</p>
      {/* The change-password flow isn't designed yet. */}
      <Button variant="outline" size="sm" onClick={() => toast.info("Changing your password is coming soon.")}>
        Change password
      </Button>
    </div>
  );
}
