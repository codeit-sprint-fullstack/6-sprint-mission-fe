"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

// 로그인된 사용자만 접근 가능한 경로
const protectedPaths = [
  "/me",
  "/me/edit",
  "/items/create",
  "/items/edit",
  "/community/create",
  "/community/edit",
  // 추가 보호 경로들...
];

// 미인증 사용자만 접근 가능한 경로
const publicPaths = [
  // "/",
  // "/login",
  // "/register",
  // "/items",
  // "/items/detail",
  // "/community",
  // "/community/detail",
  // 추가 공개 경로들...
];

export default function RouteGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // pathname을 경로와 쿼리 부분으로 분리
    const path = pathname.split("?")[0];

    // 정확한 경로 매칭 또는 하위 경로 매칭
    const isProtectedRoute = protectedPaths.some(
      (route) =>
        path === route || (path.startsWith(route + "/") && route !== "/")
    );

    // 정확한 경로 매칭 또는 하위 경로 매칭 (단, '/'는 정확히 일치할 때만)
    const isPublicRoute = publicPaths.some(
      (route) =>
        path === route || (path.startsWith(route + "/") && route !== "/")
    );

    //사용자의 인증 상태에 따른 리다이렉트 처리
    if (isProtectedRoute && !user) {
      // 인증된 사용자만 접근 가능한 경로에 미인증 사용자가 접근
      router.push("/login");
    } else if (isPublicRoute && user) {
      // 미인증 사용자만 접근 가능한 경로에 인증된 사용자가 접근
      router.push("/me");
    } else {
      // 접근 가능한 경로
      setIsLoading(false);
    }
  }, [user, pathname, router]);

  // 리다이렉트 중이거나 인증 확인 중일 때는 컨텐츠를 표시하지 않음
  if (isLoading) {
    return null;
  }

  return children;
}
