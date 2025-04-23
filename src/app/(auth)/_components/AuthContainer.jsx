"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AuthContainer({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center mt-[80px] mb-[231px]">
      {
        <Image
          src="/assets/logo/logo_md.svg"
          alt="판다마켓 로고"
          width={198}
          height={66}
          className="mb-6 block md:hidden"
        />
      }
      {
        <Image
          src="/assets/logo/logo_lg.svg"
          alt="판다마켓 로고"
          width={396}
          height={132}
          className="mb-6 hidden md:block"
        />
      }
      {children}
      <div className="flex justify-between items-center w-full px-6 py-4 bg-[#E6F2FF] rounded-lg my-6">
        <span className="font-medium">간편 로그인하기</span>
        <div className="flex gap-4">
          <Link href="https://www.google.com" target="_blank">
            <Image
              src="/assets/social/google.svg"
              alt="구글 아이콘"
              width={42}
              height={42}
            />
          </Link>
          <Link href="https://www.kakaocorp.com/page" target="_blank">
            <Image
              src="/assets/social/kakao.svg"
              alt="카카오 아이콘"
              width={42}
              height={42}
            />
          </Link>
        </div>
      </div>
      <div className="text-sm font-medium">
        <span className="mr-1">판다마켓이 처음이신가요?</span>
        <span className="text-[#3182F6] underline">
          {pathname == "/login" ? (
            <Link href="/signup">회원가입</Link>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default AuthContainer;
