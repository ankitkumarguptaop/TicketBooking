// NEXT_PUBLIC_ variables are inlined into the browser bundle at build time.
export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
};
