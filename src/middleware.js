import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!authToken;

  // 인증 페이지 경로 (startsWith로 대응)
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // /items/123 형식만 보호
  const isItemDetailRoute =
    pathname.startsWith("/items/") && pathname.split("/").length === 3;

  const isEditRoute = /^\/blogs\/[0-9]+\/edit$/.test(pathname);
  const protectedRoutes = ["/profile"];

  const isProtectedRoute =
    protectedRoutes.includes(pathname) || isEditRoute || isItemDetailRoute;

  // ✅ 인증된 사용자가 인증 페이지에 접근하면 /items로 리디렉션
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/items", request.url));
  }

  // ✅ 인증되지 않은 사용자가 보호된 경로에 접근하면 /sign-in으로 리디렉션
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
