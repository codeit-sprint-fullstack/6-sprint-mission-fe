"use client";

import Link from "next/link";
import React from "react";
import SearchBox from "./SearchBox";
import SelectSort from "./SelectSort";

export default function NavBar() {
  // 렌더링(정렬 선택)
  const sortLoad = (orderBy) => {
    if (params.orderBy === orderBy) return;
    setParams((prevParams) => ({ ...prevParams, page: 1, orderBy }));
  };

  // 렌더링(검색)
  const searchLoad = (keyword) => {
    if (params.keyword === keyword) return;
    setParams((prevParams) => ({ ...prevParams, page: 1, keyword }));
  };

  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col justify-between gap-[16px] items-center w-full mt-[24px] mb-[16px] sm:gap-[24px] sm:mt-[40px] sm:mb-[24px] md:mt-[26px]">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-[20px]">게시글</h2>
          <Link
            href="/community/create"
            className="flex justify-center items-center bg-primary-100 h-[42px] w-[88px] rounded-[8px] py-3 px-[21px] text-[16px] font-semibold text-white"
          >
            글쓰기
          </Link>
        </div>
        <nav className="flex justify-between items-center w-full gap-[13px] sm:gap-[12px]">
          <SearchBox searchLoad={searchLoad} />
          <SelectSort sortLoad={sortLoad} />
        </nav>
      </div>
    </div>
  );
}
