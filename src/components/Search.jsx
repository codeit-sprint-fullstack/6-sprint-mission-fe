"use client";

import { LuSearch } from "react-icons/lu";

/** 검색 인풋 (돋보기 아이콘 포함) */
export default function Search({
  keyword,
  setKeyword,
  placeholder = "검색할 상품을 입력해주세요",
}) {
  return (
    <div className="relative w-full sm:w-80">
      {/* 아이콘 */}
      <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 w-5 h-5" />

      {/* 인풋 */}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-3 rounded-lg bg-secondary-100 text-sm
                   placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
