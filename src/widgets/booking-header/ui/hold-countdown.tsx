"use client";

import { useCallback } from "react";

import { holdExpired, HoldTimer } from "@/features/hold-seats";
import { selectionCleared } from "@/features/select-seats";
import { useAppDispatch } from "@/shared/lib/store-hooks";

type Props = {
  showId: string;
};

export function HoldCountdown({ showId }: Props) {
  const dispatch = useAppDispatch();

  // Stable so the timer's effect isn't restarted on every render.
  const handleExpire = useCallback(() => {
    dispatch(selectionCleared());
    dispatch(holdExpired());
  }, [dispatch]);

  return <HoldTimer showId={showId} onExpire={handleExpire} />;
}
