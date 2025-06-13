"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AuthFooter() {
  const pathname = usePathname();

  return (
    <footer>
      <div className="flex justify-between items-center w-full px-6 py-4 bg-[#E6F2FF] rounded-lg my-6">
        <span className="font-medium">간편 로그인하기</span>
        <div className="flex gap-4">
          <Link href="https://panda-market-api.onrender.com/auth/google">
            <Image
              src="/assets/social/google.svg"
              alt="구글 아이콘"
              width={42}
              height={42}
            />
          </Link>
          <Link href="https://panda-market-api.onrender.com/auth/kakao">
            <Image
              src="/assets/social/kakao.svg"
              alt="카카오 아이콘"
              width={42}
              height={42}
            />
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
