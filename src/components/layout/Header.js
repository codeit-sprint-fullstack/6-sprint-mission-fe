"use client";

import Image from "next/image";
import { rokaf } from "../../app/fonts";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Header() {
  const pathName = usePathname();
  const shouldHideHeader = pathName === "/login" || pathName === "/sign-up";
  if (shouldHideHeader) return null;
  return (
    <header className="flex items-center not-only:justify-between bg-white border-b-1 border-gray-200 h-[70px] px-4 md:px-6 xl:px-[200px]">
      <div className="flex items-center gap-4 md:gap-12">
        <div className="flex items-center gap-2">
          <Image
            src="/logo/logo.svg"
            alt="판다마켓 로고"
            width={40}
            height={40}
            className="hidden md:block"
          />
          <p
            className={`${rokaf.className} font-custom text-xl text-primary md:text-[26px] `}
          >
            판다마켓
          </p>
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-2 md:gap-12">
            <li>
              <Link
                href="/community"
                className={`font-bold ${pathName === "/community" ? "text-primary" : "text-secondary-600"} md:text-lg`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={`font-bold ${pathName === "/items" ? "text-primary" : "text-secondary-600"} md:text-lg`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Link href="/login">
        <Button>로그인</Button>
      </Link>
    </header>
  );
}
