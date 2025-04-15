"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Btn from "../ui/Btn";

function Header() {
  const router = useRouter();

  return (
    <header className="fixed bg-white w-full h-[70px] flex flex-col border-b border-gray-200">
      <div className="w-full h-[51px] pt-[9.5px] flex justify-around items-center text-[16px]">
        <div className="flex items-center cursor-pointer">
          <img
            className="w-[40px] h-[40.14px]"
            alt="작은 판다 얼굴"
            src="/image/header/작은 판다 얼굴.png"
          />
          <img
            className="flex justify-between cursor-pointer pl-[8.9px] w-[103px] h-[26px]"
            src="/image/header/판다마켓.png"
            alt="판다마켓"
          />

          <div className="flex justify-between w-[218px] ml-[47px] mr-[23px] font-pretendard font-bold">
            {/* Nav를 통해 이동 시 스타일 변경 */}
            <Link href="/">
              <div className="h-[26px] text-[18px]"> 자유게시판 </div>
            </Link>
            <Link href="/">
              <div className="h-[26px] text-[18px] mr-[30px]">중고마켓</div>
            </Link>
          </div>
        </div>

        <Link href="/">
          <Btn text="로그인" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
