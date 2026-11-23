import type { User } from "../model/types";

/**
 * The signed-in user's display data, kept in localStorage so the header can
 * show it right after a reload. Never tokens (those are httpOnly cookies).
 * It's only a hint: GET /users/me confirms or replaces it on every load.
 *
 * Storage can throw (private mode, blocked site data), so every call is guarded.
 */
const storageKey = "balcony.user";

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const user = value as Record<string, unknown>;
  return typeof user.id === "string" && typeof user.fullName === "string" && typeof user.email === "string";
}

export function readSavedUser(): User | null {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(user));
  } catch {
    // Not saved: the next reload just waits for /users/me.
  }
}

export function clearSavedUser(): void {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Nothing to clear if storage is unavailable.
  }
}
