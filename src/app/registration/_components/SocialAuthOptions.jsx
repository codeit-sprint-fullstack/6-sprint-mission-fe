"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image"; //

export default function SocialAuthOptions() {
  return (
    <>
      <div className="bg-[#E6F2FF] text-secondary-800 rounded-lg px-6 py-4 w-full font-medium leading-[26px]">
        <div className="flex items-center justify-between w-full h-full">
          <p>간편 로그인하기</p>
          <div className="flex gap-4">
            <Image
              src="/icons/ic_google.svg"
              width={42}
              height={42}
              alt="구글 로그인 아이콘"
            />
            <Image
              src="/icons/ic_kakaotalk.svg"
              width={42}
              height={42}
              alt="카카오톡 로그인 아이콘"
            />
          </div>
        </div>
      </div>
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
    </>
  );
}
