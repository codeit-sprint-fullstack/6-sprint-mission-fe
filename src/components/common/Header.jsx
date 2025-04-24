"use client";

import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center w-full h-[70px] border-b border-[#dfdfdf] px-4 md:px-6 lg:px-50">
      <div className="flex items-center gap-4 md:gap-[35px]">
        <Link href="/">
          {/* 모바일 */}
          <Image
            src="/assets/logo/logo_typo.svg"
            alt="판다마켓 로고"
            width={81}
            height={27}
            className="block md:hidden"
          />
          {/* 태블릿 이상 */}
          <Image
            src="/assets/logo/logo_sm.svg"
            alt="판다마켓 로고"
            width={153}
            height={51}
            className="hidden md:block"
          />
        </Link>
        <div className="flex gap-2 md:gap-[30px] mr-[23px] md:text-[18px] font-bold text-gray-600">
          <Link
            href="/board"
            className={pathname.startsWith("/board") ? "text-primary-100" : ""}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={pathname.startsWith("/items") ? "text-primary-100" : ""}
          >
            중고마켓
          </Link>
        </div>
      </div>
      {user ? (
        <div className="flex items-center">
          <Link href="/me">
            <button>
              <Image
                src="/assets/icon/ic_profile.svg"
                alt="프로필"
                width={40}
                height={40}
              />
            </button>
          </Link>
          <span className="hidden lg:block text-lg ml-[6px]">
            {user.nickname}
          </span>
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
