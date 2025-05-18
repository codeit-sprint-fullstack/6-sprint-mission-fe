"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function Header() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const isActive = (href) => pathname === href;
  console.log("🧭 Header 렌더링됨 - user:", user, "isLoading:", isLoading);
  if (isLoading) {
    return null;
  }

  return (
    <header className="flex justify-between items-center px-4 py-3 md:px-8 lg:px-16 border-b border-gray-200">
      <div className="flex items-center">
        <Link
          href="/"
          aria-label="홈으로 이동"
          className="mr-4 md:mr-9 xl:mr-12"
        >
          <Image
            src="/images/logo/logo.svg"
            alt="판다마켓 로고"
            width={153}
            height={40}
          />
        </Link>

        <nav>
          <ul className="flex gap-2 md:gap-9 text-base md:text-lg font-bold text-gray-600">
            <li>
              <Link
                href="/board"
                className={`hover:text-blue-500 ${
                  isActive("/board") ? "text-blue-500" : ""
                }`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={`hover:text-[#3692FF] ${
                  isActive("/items") ? "text-[#3692FF]" : ""
                }`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-gray-600">
              <Image
                src="/images/icons/ic_profile.svg"
                alt="프로필"
                width={24}
                height={24}
              />
              <span className="text-sm md:text-base font-medium">
                {user.nickname}
              </span>
            </div>
            <button
              onClick={logout}
              className="text-sm md:text-base text-gray-500 hover:text-red-500 font-medium"
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-blue-500 hover:underline font-semibold text-sm md:text-base"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
