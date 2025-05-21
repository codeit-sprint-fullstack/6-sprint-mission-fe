"use client";
import Image from "next/image";
import Link from "next/link";
import pandalogo from "../assets/판다얼굴.png";
import pandatext from "../assets/판다마켓.png";
import { userService } from "../app/providers/AuthProvider";
import defaultProfile from "../assets/face.png";

export default function Header() {
  const { user } = userService();
  return (
    <header className="w-full h-[4.375rem] flex items-center justify-center border-b border-[#DFDFDF]">
      <div className="max-w-[75rem] w-full h-full flex items-center justify-between px-4 md:px-6">
        <div className="h[4.375rem] flex gap-2">
          <Link href="/" className="flex items-center justify-between gap-2">
            <div className="hidden md:block lg:block">
              <Image
                src={pandalogo}
                width={40}
                height={40}
                alt="판다마켓 로고"
              />
            </div>
            <div className="relative  w-[5rem] h-[1.75rem] md:w-[6.4rem] md:h-[2.2rem] lg:w-[6.4rem] lg:h-[2.2rem]">
              <Image src={pandatext} alt="판다마켓 텍스트 사진" fill />
            </div>
          </Link>

          <div className="headertext flex items-center text-center justify-center md:ml-[1.3rem] md:w-[6.8125rem] md:text-[1.125rem]  lg:ml-[2rem] lg:w-[6.8125rem] lg:text-[1.125rem]">
            <Link href="/articles"> 자유게시판</Link>
          </div>

          <div className="headertext flex items-center text-center justify-center md:w-[6.8125rem] md:text-[1.125rem]  lg:w-[6.8125rem] lg:text-[1.125rem] ">
            <Link href="/items"> 중고마켓</Link>
          </div>
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <Image
              src={user.user.image ?? defaultProfile} // 기본 이미지 fallback
              width={32}
              height={32}
              alt="유저 이미지"
              className="rounded-full"
            />
            <span className="font-semibold">{user.user.nickname}</span>
          </div>
        ) : (
          <Link href="/login">
            <button className="w-[5.5rem] h-[2.625rem] rounded-lg bg-primary px-5 py-3 gap-2.5 text-white font-semibold text-base leading-none tracking-normal align-middle">
              로그인
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
