"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/Button";


export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 확인

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-[200px] py-[14px]">
      <div className="flex items-center gap-[32px]">
        <Link href="/">
          <Image src="/headerLogo.svg" alt="Logo" width={153} height={51} />
        </Link>
        <div className="flex gap-[40px]">
          <Link
            href="/free-board"
            className={`text-[18px] font-semibold ${
              pathname.startsWith("/free-board")
                ? "text-primary"
                : "text-primary-600"
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/market"
            className={`text-[18px] font-semibold ${
              pathname.startsWith("/market")
                ? "text-primary"
                : "text-primary-600"
            }`}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <Button buttonText={"로그인"} onClick={handleClick} />
    </div>
  );
}
