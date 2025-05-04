import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!authToken;

  const authPaths = ["/login", "/signup"];
  const isAuthRoute = authPaths.includes(pathname);

  const isEditRoute = /^\/blogs\/[0-9]+\/edit$/.test(pathname);

  // /items/123 형식만 보호
  const isItemDetailRoute =
    pathname.startsWith("/items/") && pathname.split("/").length === 3;

  const protectedRoutes = ["/profile"];

  const isProtectedRoute =
    protectedRoutes.includes(pathname) || isEditRoute || isItemDetailRoute;

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/blogs", request.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
