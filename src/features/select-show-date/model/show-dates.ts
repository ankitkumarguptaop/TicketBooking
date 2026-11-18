export type ShowDate = {
  /** YYYY-MM-DD in local time, used in the URL. */
  key: string;
  date: Date;
};

const bookableDays = 7;

export function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Today plus the next six days, each at local midnight. */
export function getShowDates(now: Date): ShowDate[] {
  return Array.from({ length: bookableDays }, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    return { key: toDateKey(date), date };
  });
}

/** Reads `?date=` from the URL. Missing or out-of-range dates fall back to today. */
export function getSelectedShowDate(
  searchParams: Record<string, string | string[] | undefined>,
  dates: ShowDate[],
): ShowDate {
  const value = searchParams.date;
  return dates.find((showDate) => showDate.key === value) ?? dates[0];
}
