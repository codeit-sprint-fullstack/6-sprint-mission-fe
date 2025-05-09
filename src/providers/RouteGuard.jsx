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

    //디버깅
    console.log("라우터 가드 시작 전");

    if (user && isPublicRoute) {
      alert("인증된 사용자 입니다.");

      //디버깅
      console.log("alert가 떴습니다.");

      redirected.current = true;
      router.push("/items");
      return;
    }

    if (!user && isProtectedRoute) {
      //디버깅
      console.log("라우터 가드 중");

      alert("인증되지 않은 사용자 입니다.");
      redirected.current = true;
      router.push("/login");
      return;
    }
  }, [user, pathname, router]);

  return children;
}
