import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { env } from "@/shared/config/env";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    // Send the httpOnly session cookie set by the API on every request.
    credentials: "include",
  }),
  tagTypes: ["User", "SeatMap", "NotificationPreferences", "LoginSession"],
  endpoints: () => ({}),
});
