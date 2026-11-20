const relativeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["week", 7 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
];

/** "3 months ago", "yesterday", "now". `now` is passed in so callers control when time is read. */
export function formatRelativeTime(isoDate: string, now: number): string {
  const seconds = Math.round((new Date(isoDate).getTime() - now) / 1000);

  for (const [unit, unitSeconds] of units) {
    if (Math.abs(seconds) >= unitSeconds) {
      return relativeFormat.format(Math.round(seconds / unitSeconds), unit);
    }
  }

  return relativeFormat.format(0, "second");
}
