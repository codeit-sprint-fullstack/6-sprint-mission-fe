"use client";

import Image from "next/image";
import Link from "next/link";
import ic_small_panda_logo from "@/assets/images/common/header/ic_small_panda_logo.svg";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const path = usePathname();

  return (
    <header className="flex justify-center items-center font-pretendard bg-white w-full sticky top-0 z-2 border-b-[1.3px] border-b-secondary-gray">
      <div className="flex justify-between items-center px-[16px] h-[70px] w-full max-w-[1920px] sm:px-[24px] md:px-[200px]">
        <div className="flex justify-center items-center gap-[8px] sm:gap-[20px] md:gap-[24px]">
          <Link
            href="/"
            className="flex justify-between items-center text-primary-100 h-[40px] sm:h-[51px] sm:w-[153px]"
          >
            <div className="relative w-[40px] h-[40px] hidden sm:block">
              <Image
                src={ic_small_panda_logo}
                alt="판다로고"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="flex justify-center items-center w-[81px] h-[27px] font-rokafSans font-bold text-[20.2px] sm:text-[25.6px] sm:w-[103px] sm:h-[35px]">
              판다마켓
            </h1>
          </Link>
          <div className="flex justify-center items-center gap-[8px]">
            <Link
              href="/community"
              className={clsx(
                path.startsWith("/community")
                  ? "text-primary-100"
                  : "text-secondary-gray-500",
                "flex no-underline text-[16px]/[26px] font-bold text-center hover:text-primary-100 active:text-primary-200 sm:py-[21px] sm:px-[15px] sm:text-[18px]"
              )}
            >
              자유게시판
            </Link>
            <Link
              href="/products"
              className={clsx(
                path.startsWith("/products")
                  ? "text-primary-100"
                  : "text-secondary-gray-500",
                "flex no-underline text-[16px]/[26px] font-bold text-center hover:text-primary-100 active:text-primary-200 sm:py-[21px] sm:px-[15px] sm:text-[18px]"
              )}
            >
              중고마켓
            </Link>
          </div>
        </div>
        <Link
          href="/auth/login"
          className="flex justify-center items-center bg-primary-100 hover:bg-primary-200 active:bg-primary-300 h-[42px] w-[88px] rounded-[8px] py-3 px-[21px] text-[16px] font-semibold text-white"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
