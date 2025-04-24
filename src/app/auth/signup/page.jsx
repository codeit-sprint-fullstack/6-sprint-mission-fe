import React from "react";
import Signup from "../_components/Signup";
import SimpleLogin from "../_components/SimpleLogin";
import Link from "next/link";
import Image from "next/image";
import ic_big_panda_logo from "@/assets/images/auth/ic_big_panda_logo.svg";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center py-[24px] px-[16px] sm:py-[48px] sm:px-[52px] md:py-[60px]">
      <div className="flex flex-col w-full max-w-[640px] gap-[24px] sm:gap-[40px]">
        <header className="flex justify-center items-center h-[66px] sm:h-[132px]">
          <Link href="/" className="flex gap-[13px] sm:gap-[22px]">
            <div className="relative w-[51.5px] h-[51.5px] sm:w-[103.5px] sm:h-[103.5px]">
              <Image
                src={ic_big_panda_logo}
                alt="판다 로고"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-rokafSans font-bold text-[33px] text-primary-100 sm:text-[66px]">
              판다마켓
            </h1>
          </Link>
        </header>
        <div className="flex flex-col gap-[24px]">
          <Signup />
          <SimpleLogin />
          <footer className="flex justify-center items-center gap-[4px] font-medium text-[14px]/[24px]">
            <p className="text-secondary-gray-700">이미 회원이신가요?</p>
            <Link href="/auth/login" className="text-[#3182F6] underline">
              로그인
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
