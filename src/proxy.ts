import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_COOKIE_KEY = "akij_access_token";
const AUTH_ROUTE = "/auth/login";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get(AUTH_COOKIE_KEY)?.value;
  const isAuthRoute = pathname.startsWith(AUTH_ROUTE);

  if (!authToken && !isAuthRoute) {
    return NextResponse.redirect(new URL(AUTH_ROUTE, request.url));
  }

  if (authToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$).*)",
  ],
};
