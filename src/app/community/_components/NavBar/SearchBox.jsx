"use client";

import React, { useState } from "react";
import ic_search from "@/assets/images/common/search-box/ic_search.svg";
import Image from "next/image";

export default function SearchBox({ searchLoad }) {
  const [keyword, setKeyword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchLoad(keyword);
      }}
      className="relative flex w-full"
    >
      <label
        htmlFor="search"
        className="absolute z-1 left-[16px] top-[9px] w-[24px] h-[24px]"
      >
        <Image src={ic_search} alt="돋보기" fill className="object-cover " />
      </label>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        id="search"
        className="flex w-full h-[42px] bg-secondary-gray-100 rounded-[12px] outline-none py-[9px] pr-[20px] pl-[44px] text-[16px] font-normal placeholder-secondary-gray-300"
        type="text"
        placeholder="검색할 게시글을 입력해주세요"
      />
    </form>
  );
}
