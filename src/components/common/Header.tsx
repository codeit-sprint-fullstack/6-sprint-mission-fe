"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isActiveMarket = pathname.startsWith("/items");
  const isActiveArticle = pathname.startsWith("/articles");

  return (
    <header className="w-full flex items-center bg-white shadow-sm sticky top-0 z-10 h-[4.375rem] px-8">
      <Link href="/" className="md:ml-[12.5rem] sm:ml-0">
        <div className="block sm:hidden w-[61px] h-[27px] relative">
          <Image src="/images/logo/logo-sm.svg" alt="모바일 로고" fill />
        </div>

        {/* 데스크탑 로고 */}
        <div className="hidden sm:block w-[153px] h-[51px] relative">
          <Image src="/images/logo/logo.svg" alt="로고" fill />
        </div>
      </Link>

      {/* 자유게시판 링크 */}
      <Link
        href="/board"
        className={`sm:text-lg font-semibold ml-10 ${
          isActiveArticle ? "text-primary-100" : "text-secondary-600"
        }`}
      >
        자유게시판
      </Link>

      {/* 중고마켓 링크 */}
      <Link
        href="/items"
        className={`sm:text-lg font-semibold ml-10  ${
          isActiveMarket ? "text-primary-100" : "text-secondary-600"
        }`}
      >
        중고마켓
      </Link>

      {/* 로그인 or 사용자 정보 */}
      <nav className="ml-auto flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2 text-secondary-700 font-medium relative w-7 h-7">
            <Image src="/images/profile.png" alt="프로필" fill />
            <span>{user.name || user.nickname || user.email}</span>
          </div>
        ) : (
          // 로그인 버튼
          <Link href="/login">
            <button className=" bg-primary-100 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition">
              로그인
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}
