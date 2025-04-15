"use client";

import React from "react";
import "./Header.scss";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="top-bar h-[70px] w-[100vw] fixed">
        {/* 전체 정렬 div */}
        <div className="header-container flex h-[100%] justify-between items-center">
          {/* 로고 + 메뉴 정렬 div */}
          <div className="flex gap-[20px] items-center">
            {/* 로고 */}
            <Link href="/" className="link-align">
              <picture className="logo inline-block w-[153px] h-[51px]">
                <source
                  srcSet="/assets/pc_logo.png"
                  alt="pc logo"
                  media="(min-width: 745px)"
                />
                <source
                  srcSet="/assets/mb_logo.png"
                  alt="mobile logo"
                  media="(max-width: 744px)"
                />
                <img src="/assets/pc_logo.png" alt="logo" />
              </picture>
            </Link>
            {/* 메뉴 */}
            <nav className="text-18-700">
              <ul className="flex gap-[20px]">
                <Link
                  href="/forum"
                  className={`link-align ${
                    pathname === "/forum" ? "active" : ""
                  }`}
                >
                  <li>자유게시판</li>
                </Link>
                <Link
                  href="/market"
                  className={`link-align ${
                    pathname === "/market" ? "active" : ""
                  }`}
                >
                  <li>중고마켓</li>
                </Link>
              </ul>
            </nav>
          </div>
          <div>
            {/* 로그인 버튼 */}
            <Button size="md">로그인</Button>
          </div>
        </div>
      </header>
      {/* header 높이 */}
      <div className="pt-[70px]"></div>
    </>
  );
}

export default Header;
