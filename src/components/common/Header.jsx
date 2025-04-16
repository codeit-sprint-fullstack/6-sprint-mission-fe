"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center w-full h-[70px] border-b border-[#dfdfdf] px-4">
      <div className="flex items-center gap-6">
        <picture>
          <source
            srcSet="/assets/logo/logo_typo.svg"
            media="(max-width: 743px)"
            width={81}
            height={40}
          />
          <Link href="/">
            <Image
              src="/assets/logo/logo_sm.svg"
              alt="판다마켓 로고"
              width={153}
              height={51}
            />
          </Link>
        </picture>
        <div className="flex gap-[21px] text-[18px] font-bold text-gray-600">
          <Link
            href="/board"
            className={pathname.startsWith("/board") ? "text-primary-100" : ""}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={pathname == "/items" ? "text-primary-100" : ""}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <Link href="/login">
        <button className="btn-base" type="button">
          로그인
        </button>
      </Link>
    </header>
  );
}

export default Header;
