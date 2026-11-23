/**
 * Every page needs a signed-in user, except these. Used by src/proxy.ts
 * (before render) and by the client guard (when a session ends while a page
 * is open). Add a path here to make it public, e.g. "/forgot-password".
 */
const guestOnlyPaths = ["/login", "/register", "/register/verify"];

export function isGuestOnlyPath(pathname: string): boolean {
  return guestOnlyPaths.includes(pathname);
}

export function isProtectedPath(pathname: string): boolean {
  return !isGuestOnlyPath(pathname);
}

/** Where signed-in users prove their email and phone. Protected, but allowed while unverified. */
export const verifyPath = "/verify";

/** "/verify?next=%2Fprofile": verify, then come back here. */
export function verifyPathFor(returnTo: string): string {
  return `${verifyPath}?next=${encodeURIComponent(returnTo)}`;
}

/**
 * Sign-up step 2: verify the email (and optionally the phone) BEFORE the
 * first sign-in. Guest-only: it works from the verification cookie that
 * register (or an unverified login) sets, not from a session.
 */
export function registerVerifyPathFor(returnTo: string): string {
  return `/register/verify?next=${encodeURIComponent(returnTo)}`;
}

/** "/login?next=%2Fprofile": login, then come back here. */
export function loginPathFor(returnTo: string): string {
  return `/login?next=${encodeURIComponent(returnTo)}`;
}

/**
 * The `next` param comes from the URL, so anyone can craft it. Only same-site
 * paths are allowed: "//evil.com" and "/\evil.com" are other sites to a browser.
 */
export function getSafeReturnPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/";
  return next;
}
