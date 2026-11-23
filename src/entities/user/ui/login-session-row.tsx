import type { ReactNode } from "react";

import { formatRelativeTime } from "@/shared/lib/format-relative-time";

import { getDeviceLabel } from "../lib/get-device-label";
import type { LoginSession } from "../model/types";

type Props = {
  session: LoginSession;
  /** Epoch ms used for "Last active …", so every row agrees on the time. */
  now: number;
  /** Right-hand slot, e.g. a sign-out button. */
  children?: ReactNode;
};

export function LoginSessionRow({ session, now, children }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold">
          {getDeviceLabel(session)}
          {session.ipAddress && <span className="font-normal text-muted-foreground"> · {session.ipAddress}</span>}
        </p>
        {session.current ? (
          <p className="text-xs text-success">Active now</p>
        ) : (
          <p className="text-xs text-muted-foreground">Last active {formatRelativeTime(session.lastUsedAt, now)}</p>
        )}
      </div>
      {session.current ? <span className="text-xs text-muted-foreground">This device</span> : children}
    </div>
  );
}
