"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b px-6 py-3 flex items-center justify-between bg-white">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center">
          <img
            src="/icons/ic_gnb.svg"
            alt="판다마켓 로고"
            className="w-[153px] h-[51px]]" // 필요 시 너비 조절
          />
        </Link>
        <nav className="flex gap-4 text-gray-600 font-medium text-sm">
          <Link
            href="/board"
            className={`w-[78px] h-[26px] flex items-center justify-center rounded 
              ${
                pathname.startsWith("/board")
                  ? "text-blue-500"
                  : "text-gray-600"
              }
              font-medium text-sm`}
          >
            자유게시판
          </Link>
          <Link
            href="/used"
            className={`w-[63px] h-[26px] flex items-center justify-center rounded 
    ${pathname.startsWith("/used") ? "text-blue-500" : "text-gray-600"}
    font-medium text-sm`}
          >
            중고마켓
          </Link>
        </nav>
      </div>
      <Link
        href="/auth/login"
        className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600 transition"
      >
        로그인
      </Link>
    </header>
  );
}
