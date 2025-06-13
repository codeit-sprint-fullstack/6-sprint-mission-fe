"use client";

import { Logo, ProfileIcon, TypoLogo } from "@/assets/svgs";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="flex h-[70px] w-full items-center justify-between border-b border-[#dfdfdf] px-4 md:px-6 lg:px-50">
      <div className="flex items-center gap-4 md:gap-[35px]">
        <Link href="/">
          {/* 모바일 */}
          <TypoLogo aria-label="판다마켓 로고" className="blcok md:hidden" />
          {/* 태블릿 이상 */}
          <Logo aria-label="판다마켓 로고" className="hidden h-[51px] w-[153px] md:block" />
        </Link>
        {!(pathname === "/") && (
          <div className="mr-[23px] flex gap-2 font-bold text-gray-600 md:gap-[30px] md:text-[18px]">
            <Link href="/board" className={pathname.startsWith("/board") ? "text-primary-100" : ""}>
              자유게시판
            </Link>
            <Link href="/items" className={pathname.startsWith("/items") ? "text-primary-100" : ""}>
              중고마켓
            </Link>
          </div>
        )}
      </div>
      {user ? (
        <div className="flex items-center">
          <Link href="/me">
            <button>
              <ProfileIcon aria-label="프로필" />
            </button>
          </Link>
          <span className="ml-[6px] hidden text-lg lg:block">{user.nickname}</span>
        </div>
      ) : (
        <Link href="/login">
          <button className="btn-base" type="button">
            로그인
          </button>
        </Link>
      )}
    </header>
  );
}

export default Header;
