"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchSortBar(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"latest" | "likes">("latest");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as "latest" | "likes");
  };
  return (
    <div className="w-full max-w-[1200px] mx-auto mb-6 flex items-center justify-between gap-4">
      {/* 검색창 (아이콘 포함) */}
      <div className="flex items-center flex-1 h-[42px] px-5 bg-gray-100 rounded-lg font-normal text-base text-secondary-100">
        <FiSearch className="text-gray-400 mr-1" />
        <input
          type="text"
          className="bg-transparent outline-none w-full placeholder:text-secondary-400"
          placeholder="검색할 상품을 입력해주세요"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* 정렬 드롭다운 */}
      <select
        className="w-[130px] min-h-[42px] text-[16px] text-secondary-800 border border-gray-200 rounded-[12px] px-5 py-3 bg-white"
        value={sort}
        onChange={handleSortChange}
      >
        <option value="latest">최신순</option>
        <option value="likes">좋아요순</option>
      </select>
    </div>
  );
}

export default SearchSortBar;
