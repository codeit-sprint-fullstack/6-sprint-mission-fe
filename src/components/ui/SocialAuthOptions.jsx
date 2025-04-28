"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; //
import { usePathname } from "next/navigation";

export default function SocialAuthOptions() {
  const pathName = usePathname();
  const isLoginPage = pathName === "/login";
  const isRegistrationPage = pathName === "/registration";
  return (
    <>
      <div className="bg-[#E6F2FF] text-secondary-800 rounded-lg px-6 py-4 w-full font-medium leading-[26px]">
        <div className="flex items-center justify-between w-full h-full">
          <p>간편 로그인하기</p>
          <div className="flex gap-4">
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/ic_google.svg"
                width={42}
                height={42}
                alt="구글 로그인 아이콘"
              />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/ic_kakaotalk.svg"
                width={42}
                height={42}
                alt="카카오톡 로그인 아이콘"
              />
            </a>
          </div>
        </div>
      </div>

      {isRegistrationPage && (
        <div className="flex gap-1 justify-center items-center">
          <span className="text-secondary-800 text-sm font-medium leading-[24px]">
            이미 회원이신가요?
          </span>
          <Link
            href="/login"
            className="text-primary underline text-sm font-medium leading-[24px]"
          >
            로그인
          </Link>
        </div>
      )}

      {isLoginPage && (
        <div className="flex gap-1 justify-center items-center">
          <span className="text-secondary-800 text-sm font-medium leading-[24px]">
            판다마켓이 처음이신가요?
          </span>
          <Link
            href="/registration"
            className="text-primary underline text-sm font-medium leading-[24px]"
          >
            회원가입
          </Link>
        </div>
      )}
    </>
  );
}
