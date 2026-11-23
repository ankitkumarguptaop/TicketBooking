import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithRefresh } from "./base-query-with-refresh";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["User", "SeatMap", "NotificationPreferences", "LoginSession"],
  endpoints: () => ({}),
});
