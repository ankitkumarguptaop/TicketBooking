/** Shape of every paginated list the API returns. */
export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

/** The largest `limit` the API accepts on list endpoints. */
export const maxPageSize = 100;
