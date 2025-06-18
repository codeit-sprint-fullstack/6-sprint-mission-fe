import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const path = pathname.split("?")[0];

  const protectedPaths = ["/me", "/items", "/board"];
  const publicPaths = ["/", "/login", "/register"];

  const isAuthenticated = !!refreshToken;
  const isProtectedRoute = protectedPaths.some(
    (route) => path === route || (path.startsWith(route + "/") && route !== "/")
  );
  const isPublicRoute = publicPaths.some(
    (route) => path === route || (path.startsWith(route + "/") && route !== "/")
  );

  // 인증된 사용자가 PublicRoute 접근 시 중고마켓 페이지로 리디렉션
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/items", request.url));
  }

  // 인증되지 않은 사용자가 ProtectedRoute 접근 시 로그인 페이지로 리디렉션
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
