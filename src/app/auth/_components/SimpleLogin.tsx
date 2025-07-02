import Image from "next/image";
import React from "react";
import ic_google from "@/assets/images/auth/ic_google.svg";
import ic_kakao from "@/assets/images/auth/ic_kakao.svg";
import Link from "next/link";

export default function SimpleLogin() {
  return (
    <nav className="flex justify-center items-center">
      <div className="flex justify-between items-center w-full h-[74px] bg-[#e6f2ff] rounded-[8px] py-[16px] px-[24px] gap-[10px]">
        <p className="font-medium text-[16px]/[26px] text-secondary-gray-700">
          간편 로그인하기
        </p>
        <div className="flex gap-[16px]">
          <Link href="https://www.google.com" target="_blank">
            <div className="w-[42px] h-[42px] rounded-full p-[10px] bg-white">
              <div className="relative w-[22px] h-[22px]">
                <Image
                  src={ic_google}
                  alt="구글"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
          <Link href="https://www.kakaocorp.com/page" target="_blank">
            <div className="w-[42px] h-[42px] rounded-full pt-[10px] px-[8px] pb-[8px] bg-[#f5e14b]">
              <div className="relative w-[26px] h-[24px]">
                <Image
                  src={ic_kakao}
                  alt="카카오톡"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
