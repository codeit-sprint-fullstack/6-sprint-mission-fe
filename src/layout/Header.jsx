"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isTablet, setIsTablet] = useState(false);

  // 커뮤니티 페이지인지 확인
  const isCommunity = pathname === "/community";

  // 중고마켓 페이지인지 확인
  const isItems = pathname === "/items";

  // 반응형 처리를 위한 useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 1200);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="flex w-full justify-center shadow-[0_10px_10px_-10px_rgba(33,35,38,0.1)]">
      <div className="mx-4 flex h-[70px] w-full max-w-[1200px] items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/img/panda_icon_big.png"
            alt="판다마켓"
            width={40}
            height={40}
            className="hidden object-cover md:block"
          />
          <span className="font-['ROKAF_Sans',sans-serif] text-[1.6rem] font-bold text-blue-500 md:ml-2.5">
            판다마켓
          </span>
        </Link>

        <nav className="ml-5 flex gap-5 text-gray-800">
          <Link
            href="/community"
            className={`text-[1.2rem] ${isCommunity ? "font-bold text-blue-500" : ""}`}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={`text-[1.2rem] ${isItems ? "font-bold text-blue-500" : ""}`}
          >
            중고마켓
          </Link>
        </nav>

        <Link
          href="/sign-in"
          className={`ml-auto flex h-10 items-center justify-center rounded-lg text-white ${!isTablet ? "w-[100px] bg-blue-400 transition-colors duration-200 hover:bg-blue-500" : ""}`}
        >
          {isTablet ? (
            <Image
              src="/img/user_icon.png"
              alt="유저 아이콘"
              width={50}
              height={50}
            />
          ) : (
            "로그인"
          )}
        </Link>
      </div>
    </header>
  );
}
