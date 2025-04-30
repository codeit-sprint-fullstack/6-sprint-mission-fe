"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const protectedPaths = ["/items"];

const publicPaths = ["/", "/auth/login", "/auth/signIn"];

export default function RouteGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

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

    if (isProtectedRoute && !user) {
      alert("인증되지 않은 사용자 입니다.");
      router.push("/login");
    } else {
      // 인증 확인 전 화면 노출 방지
      setIsLoading(false);
    }

    if (user && isPublicRoute) {
      alert("인증된 사용자 입니다.");
      router.push("/items");
    } else {
      // 인증 확인 전 화면 노출 방지
      setIsLoading(false);
    }
  }, [user, pathname, router]);

  // 인증 확인 전 화면 노출 방지
  if (isLoading) {
    return null;
  }

  return children;
}
