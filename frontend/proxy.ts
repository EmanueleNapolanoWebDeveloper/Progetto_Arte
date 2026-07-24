import { NextRequest, NextResponse } from "next/server";

const AUTH_FLAG_COOKIE = "is-authenticated";

const PROTECTED_ROUTES = ["/become-artist"];
const GUEST_ONLY_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  console.log("[middleware] eseguito per:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  const isAuthenticated =
    request.cookies.get(AUTH_FLAG_COOKIE)?.value === "true";

  //rotte protette
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  //rotte guest
  const isGuestRoutes = GUEST_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  //utente senza sessione
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //utente con cookie che accede a login/register
  if (isGuestRoutes && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Applica il middleware a tutte le route eccetto:
     * - file statici (_next/static, _next/image)
     * - favicon
     * - route API interne (se ne aggiungi)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
