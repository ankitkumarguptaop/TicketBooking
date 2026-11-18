"use client";

import { useEffect, useState } from "react";

import { useAppSelector } from "@/shared/lib/store-hooks";

import { selectHoldDeadline } from "../model/seat-hold-slice";

type Props = {
  showId: string;
  onExpire: () => void;
};

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function Countdown({ deadline, onExpire }: { deadline: number; onExpire: () => void }) {
  // Only mounted in the browser after a hold succeeds, so reading the clock here is safe.
  const [now, setNow] = useState(() => Date.now());
  const remaining = deadline - now;

  useEffect(() => {
    if (remaining <= 0) {
      onExpire();
      return;
    }
    const timer = setTimeout(() => setNow(Date.now()), 1000);
    return () => clearTimeout(timer);
  }, [remaining, onExpire]);

  return (
    <p className="flex h-9 items-center gap-2 rounded-md bg-primary/10 px-3 text-xs text-primary">
      Seats held for
      <span className="text-sm font-bold tabular-nums">{formatRemaining(remaining)}</span>
    </p>
  );
}

export function HoldTimer({ showId, onExpire }: Props) {
  const deadline = useAppSelector((state) => selectHoldDeadline(state, showId));
  if (deadline === null) return null;
  return <Countdown key={deadline} deadline={deadline} onExpire={onExpire} />;
}
