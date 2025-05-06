"use client";

import React from "react";
import Button from "../Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="h-[70px] w-full fixed border-b border-gray-300 top-0 left-0 bg-white z-10">
        {/* 전체 정렬 div */}
        <div className="w-full h-full mx-auto flex justify-between items-center px-[32px] lg:px-[200px]">
          {/* 로고 + 메뉴 정렬 div */}
          <div className="flex gap-[20px] items-center">
            {/* 로고 */}
            <Link href="/" className="flex items-center">
              <picture className="w-[81px] md:w-[153px]">
                <source
                  srcSet="/assets/pc_logo.png"
                  alt="pc logo"
                  media="(width > 744px)"
                />
                <source
                  srcSet="/assets/mb_logo.png"
                  alt="mobile logo"
                  media="(744px >= width)"
                />
                <img src="/assets/pc_logo.png" alt="logo" />
              </picture>
            </Link>
            {/* 메뉴 */}
            <nav className="text-[16px] md:text-[18px] font-[700]">
              <ul className="flex gap-[20px]">
                <Link
                  href="/articles"
                  className={`${
                    pathname === "/articles" ? "text-primary-100" : ""
                  }`}
                >
                  <li>자유게시판</li>
                </Link>
                <Link
                  href="/items"
                  className={`${
                    pathname === "/market" ? "text-primary-100" : ""
                  }`}
                >
                  <li>중고마켓</li>
                </Link>
              </ul>
            </nav>
          </div>
          <div>
            {/* 로그인 버튼 */}
            <Link href="/signin">
              <Button size="md">로그인</Button>
            </Link>
          </div>
        </div>
      </header>
      {/* header 높이 */}
      <div className="pt-[70px]"></div>
    </>
  );
}

export default Header;
