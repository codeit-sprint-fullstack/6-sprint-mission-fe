"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

const protectedPaths = ["/me", "/items", "/board"];
const publicPaths = ["/login", "/register"];

function RouteGuard({ children }) {
  const { user, loadingUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingUser) return;

    const path = pathname.split("?")[0];

    const isProtectedRoute = protectedPaths.some(
      (route) =>
        path === route || (path.startsWith(route + "/") && route !== "/")
    );

    const isPublicRoute = publicPaths.some(
      (route) =>
        path === route || (path.startsWith(route + "/") && route !== "/")
    );

    // 사용자의 인증 상태에 따른 리다이렉트 처리
    if (isProtectedRoute && !user) {
      alert("로그인 후 이용해주세요");
      router.push("/login");
    } else if (isPublicRoute && user) {
      // 미인증 사용자만 접근 가능한 경로에 인증된 사용자가 접근
      router.push("/items");
    } else {
      setLoading(false);
    }
  }, [user, pathname, router, loadingUser]);

  if (loading || loadingUser) return null;

  return children;
}

export default RouteGuard;
