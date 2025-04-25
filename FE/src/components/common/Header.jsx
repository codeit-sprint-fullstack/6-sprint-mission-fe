"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import pandaLogoImage from "@/assets/images/logo/panda_logo.png";

export function AuthHeader() {
  return (
    <div className="flex justify-center items-center w-50 h-17 text-primary-100 text-4xl font-bold gap-2">
      <Image src={pandaLogoImage} alt="pandaLogoImage" className="w-13" />
      <p>판다마켓</p>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isCommunity = pathname.startsWith("/community");
  const isMarket = pathname.startsWith("/items");

  const linkBaseStyle = "text-sm sm:text-base font-bold px-2 cursor-pointer";
  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-full h-[70px] bg-FF px-4 sm:px-6 flex items-center justify-between border-b-[1px] border-DF">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className={clsx(
              "flex items-center gap-2 w-fit text-primary-100",
              "text-xl-bold"
            )}
          >
            <Image
              className="hidden tablet:block web:block"
              src={pandaLogoImage}
              alt="Panda Market Logo"
              width={40}
              height={40}
            />
            <div>판다마켓</div>
          </Link>

          <nav className="flex gap-3 tablet:gap-4 web:gap-4">
            <Link
              href="/community"
              className={`${linkBaseStyle} ${
                isCommunity ? "text-blue-500" : "text-gray-600"
              }`}
            >
              자유게시판
            </Link>
            <Link
              href="/items"
              className={`${linkBaseStyle} ${
                isMarket ? "text-blue-500" : "text-gray-600"
              }`}
            >
              중고마켓
            </Link>
          </nav>
        </div>

        <Link href="/login" className="btn-sm-48 bg-primary-100">
          로그인
        </Link>
      </header>

      {/* 헤더만큼 패딩 */}
      <div className="h-[70px]" />
    </>
  );
}
