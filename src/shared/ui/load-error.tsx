"use client";

import { Button } from "@/shared/ui/button";

type Props = {
  message: string;
  onRetry: () => void;
};

export function LoadError({ message, onRetry }: Props) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3">
      <p className="text-sm font-semibold">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
