"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

const protectedPaths = ["/items", "/registration"];

const publicPaths = ["/", "/auth/login", "/auth/signIn"];

export default function RouteGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const redirected = useRef(false);

  useEffect(() => {
    //아직 사용자 정보가 로딩되지 않은 경우 렌더링 하지 않음
    if (user === undefined || redirected.current) return;

    // pathname을 경로와 쿼리 부분으로 분리
    const path = pathname.split("?")[0];

    const isProtectedRoute = protectedPaths.includes(path);
    const isPublicRoute = publicPaths.includes(path);

    if (user && isPublicRoute) {
      alert("로그인된 상태 입니다.");

      redirected.current = true;
      router.push("/items");
      return;
    }

    if (!user && isProtectedRoute) {
      alert("인증되지 않은 사용자 입니다.");
      redirected.current = true;
      router.push("/login");
      return;
    }
  }, [user, pathname, router]);

  return children;
}
