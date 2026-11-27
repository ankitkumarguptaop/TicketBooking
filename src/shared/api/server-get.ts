import { env } from "@/shared/config/env";

/**
 * GET for Server Components. Returns null on 404 so a page can call notFound().
 * Any other failure throws and is caught by the nearest error.tsx (which has a retry).
 */
export async function serverGet<T>(path: string): Promise<T | null> {
  const response = await fetch(`${env.apiUrl}${path}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GET ${path} failed with status ${response.status}`);
  return (await response.json()) as T;
}
