import type { LoginSession } from "../model/types";

// Order matters: Edge and Opera user agents also contain "Chrome",
// and Chrome's also contains "Safari".
const browsers: [pattern: RegExp, name: string][] = [
  [/Edg\//, "Edge"],
  [/OPR\//, "Opera"],
  [/Firefox\//, "Firefox"],
  [/Chrome\//, "Chrome"],
  [/Safari\//, "Safari"],
];

const systems: [pattern: RegExp, name: string][] = [
  [/iPhone/, "iPhone"],
  [/iPad/, "iPad"],
  [/Android/, "Android"],
  [/Windows/, "Windows"],
  [/Mac OS X/, "macOS"],
  [/Linux/, "Linux"],
];

function firstMatch(text: string, list: [RegExp, string][]): string | undefined {
  return list.find(([pattern]) => pattern.test(text))?.[1];
}

/** "Chrome on Windows", or the name given at login, or a fallback. */
export function getDeviceLabel(session: Pick<LoginSession, "deviceName" | "userAgent">): string {
  if (session.deviceName) return session.deviceName;
  if (!session.userAgent) return "Unknown device";

  const browser = firstMatch(session.userAgent, browsers);
  const system = firstMatch(session.userAgent, systems);
  if (browser && system) return `${browser} on ${system}`;
  return browser ?? system ?? "Unknown device";
}
