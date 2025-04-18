"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full h-[70px] flex items-center px-[200px] bg-white border-b border-[#DFDFDF]">
      <Link href="/" className="mr-10 flex-shrink-0">
        <Image
          src="/images/logo/panda-market-logo.png"
          alt="판다마켓 홈"
          width={153}
          height={40}
          priority
        />
      </Link>

      <nav className="flex items-center gap-5">
        <Link
          href="/board"
          className={`text-lg font-bold no-underline ${
            pathname === "/board" ? "text-blue-500" : "text-gray-700"
          }`}
        >
          자유게시판
        </Link>
        <Link
          href="/items"
          className={`text-lg font-bold no-underline ${
            pathname === "/items" ? "text-blue-500" : "text-gray-700"
          }`}
        >
          중고마켓
        </Link>
      </nav>

      <Link href="/login" className="button login-button ml-auto">
        로그인
      </Link>
    </header>
  );
};

export default Header;
