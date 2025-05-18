"use client";

import Image from "next/image";

export default function SocialLoginButtons() {
  return (
    <div className="h-[74px] mt-6 bg-[#E6F2FF] rounded-md flex items-center justify-center">
      <div className="flex w-[594px] h-[42px] justify-between items-center">
        <h3 className="text-base font-medium">간편 로그인하기</h3>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="구글 로그인"
          >
            <Image
              src="/images/social/google-logo.png"
              alt="구글"
              width={42}
              height={42}
            />
          </a>
          <a
            href="https://www.kakaocorp.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="카카오 로그인"
          >
            <Image
              src="/images/social/kakao-logo.png"
              alt="카카오"
              width={42}
              height={42}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
