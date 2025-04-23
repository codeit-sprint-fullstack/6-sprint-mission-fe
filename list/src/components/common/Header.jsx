"use client";

import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="w-full bg-white fixed top-0 z-50 border-b-1 border-b-#DFDFDF">
        <div className="max-w-[1580px] mx-auto flex items-center justify-between py-2.5 px-6 ">
          <div className="flex items-center gap-8">
            <Link href="/">
              <Image src={logo} width={153} height={52} alt="판다마켓 로고" />
            </Link>
            <nav>
              <ul className="flex gap-6 text-lg font-medium">
                <li>
                  <a
                    href="/board"
                    className={
                      pathname.startsWith("/board")
                        ? "text-primary"
                        : "text-black"
                    }
                  >
                    자유게시판
                  </a>
                </li>
                <li>
                  <a
                    href="/market"
                    className={
                      pathname.startsWith("/market")
                        ? "text-primary"
                        : "text-black"
                    }
                  >
                    중고마켓
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <button className="btn px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors">
            로그인
          </button>
        </div>
      </header>
      <div className="h-24" /> {/* 헤더 높이만큼 공간 확보 */}
    </>
  );
}
