"use client";

import Link from "next/link";
import React from "react";
import SearchBox from "./SearchBox";
import SelectSort from "./SelectSort";

interface INavBarProps {
  changeKeywordInParams: (keyword: string) => void;
  changeOrderByInParams: (orderBy: string) => void;
}

export default function NavBar({
  changeKeywordInParams,
  changeOrderByInParams,
}: INavBarProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col justify-between gap-[16px] items-center w-full mt-[24px] mb-[16px] sm:gap-[24px] sm:mt-[40px] sm:mb-[24px] md:mt-[26px]">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-[20px]">게시글</h2>
          <Link
            href="/community/create"
            className="flex justify-center items-center bg-primary-100 hover:bg-primary-200 active:bg-primary-300 h-[42px] w-[88px] rounded-[8px] py-3 px-[21px] text-[16px] font-semibold text-white"
          >
            글쓰기
          </Link>
        </div>
        <nav className="flex justify-between items-center w-full gap-[13px] sm:gap-[12px]">
          <SearchBox changeKeywordInParams={changeKeywordInParams} />
          <SelectSort changeOrderByInParams={changeOrderByInParams} />
        </nav>
      </div>
    </div>
  );
}
