// en-CA formats dates as YYYY-MM-DD.
const indiaDateFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

/** YYYY-MM-DD in India time, the timezone the API uses for release dates and show dates. */
export function toIndiaDateKey(date: Date): string {
  return indiaDateFormat.format(date);
}
