import { NextResponse, type NextRequest } from "next/server";

import { isGuestOnlyPath, isProtectedPath, loginPathFor } from "@/shared/config/routes";

/**
 * Set by the API (httpOnly). We only check that it EXISTS: the proxy can't
 * verify the JWT (it doesn't have the secret), and doesn't need to. The API
 * still checks every request; this just avoids rendering a protected page
 * for someone who is clearly signed out.
 *
 * Works locally because browsers send localhost cookies to every port. In
 * production the API must set COOKIE_DOMAIN to a parent domain both apps share.
 */
const accessTokenCookie = "access_token";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(accessTokenCookie);

  if (isProtectedPath(pathname) && !hasSession) {
    return NextResponse.redirect(new URL(loginPathFor(pathname + search), request.url));
  }
  if (isGuestOnlyPath(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Every page, but not Next's build assets or files from public/ (anything
  // with an extension, e.g. /login-background.png): the login page needs those
  // before the user has a session. Must be a literal (read at build time).
  matcher: ["/((?!_next/static|_next/image|.*\\.\\w+$).*)"],
};
