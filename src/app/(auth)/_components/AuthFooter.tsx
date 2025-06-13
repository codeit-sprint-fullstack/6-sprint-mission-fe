"use client";

import { GoogleIcon, KakaoIcon } from "@/assets/svgs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

function AuthFooter() {
  const pathname = usePathname();

  return (
    <footer>
      <div className="my-6 flex w-full items-center justify-between rounded-lg bg-[#E6F2FF] px-6 py-4">
        <span className="font-medium">간편 로그인하기</span>
        <div className="flex gap-4">
          <Link href="https://panda-market-api.onrender.com/auth/google">
            <GoogleIcon aria-label="구글 아이콘" />
          </Link>
          <Link href="https://panda-market-api.onrender.com/auth/kakao">
            <KakaoIcon aria-label="카카오 아이콘" />
          </Link>
        </div>
      </div>
      <div className="text-center text-sm font-medium">
        {pathname === "/login" ? (
          <>
            <span className="mr-1">판다마켓이 처음이신가요?</span>
            <span className="text-[#3182F6] underline">
              <Link href="/signup">회원가입</Link>
            </span>
          </>
        ) : (
          <>
            <span className="mr-1">이미 회원이신가요?</span>
            <span className="text-[#3182F6] underline">
              <Link href="/login">로그인</Link>
            </span>
          </>
        )}
      </div>
    </footer>
  );
}

export default AuthFooter;
