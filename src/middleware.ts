import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = !!request.cookies.get("refreshToken")?.value;

  // 1) 인증/비인증 전용 페이지
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // 2) 보호해야 할 edit 경로
  const editRouteRegex = /^\/(community|items)\/[^/]+\/edit$/;
  const isProtectedRoute =
    editRouteRegex.test(pathname) ||
    pathname === "/community/write" ||
    pathname === "/items/registration";

  // 인증자가 auth 페이지 접근 → 메인으로
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/items", request.url));
  }

  // 비인증자가 보호 페이지 접근 → 로그인으로
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// 정적 파일·API 제외
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
