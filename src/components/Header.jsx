"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [nickname, setNickname] = useState(null);

  const isActiveMarket = pathname.startsWith("/products");
  const isActiveArticle = pathname.startsWith("/articles");

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    setNickname(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="w-full flex items-center bg-white shadow-sm sticky top-0 z-10 h-[4.375rem] px-8">
      {/* 로고 */}
      <Link href="/" className="md:ml-[12.5rem] sm:ml-0">
        {/* 모바일 로고 */}
        <div className="block sm:hidden w-[61px] h-[27px] relative">
          <Image src="/images/logo/logo-sm.svg" alt="모바일 로고" fill />
        </div>
        {/* 데스크톱 로고 */}
        <div className="hidden sm:block w-[153px] h-[51px] relative">
          <Image src="/images/logo/logo.svg" alt="로고" fill />
        </div>
      </Link>

      {/* 자유게시판 링크 */}
      <Link
        href="/articles"
        className={`sm:text-lg font-semibold ml-10 ${
          isActiveArticle ? "text-primary-100" : "text-secondary-600"
        }`}
      >
        자유게시판
      </Link>

      {/* 중고마켓 링크 */}
      <Link
        href="/products"
        className={`sm:text-lg font-semibold ml-10 ${
          isActiveMarket ? "text-primary-100" : "text-secondary-600"
        }`}
      >
        중고마켓
      </Link>

      {/* 로그인 or 닉네임+로그아웃 */}
      <nav className="ml-auto flex items-center gap-4">
        {typeof window !== "undefined" && nickname ? (
          <>
            <span className="text-sm font-semibold text-gray-700">
              {nickname}님
            </span>
            <button
              onClick={handleLogout}
              className="bg-primary-100 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="bg-primary-100 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition">
              로그인
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
