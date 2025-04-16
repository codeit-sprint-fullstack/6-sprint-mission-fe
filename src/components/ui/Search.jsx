"use client";

import React, { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");

  //검색어 입력
  const handleChange = (e) => setSearch(e.target.value);

  return (
    <div>
      <img
        className="absolute top-[8px] left-[13px]"
        src="image/ui/돋보기.png"
        alt="돋보기 아이콘"
      />

      <input
        className={
          "w-[1054px] h-[42px] border-0 rounded-[12px] bg-third pl-[44px] text-[16px]"
        }
        placeholder="검색할 상품을 입력해주세요"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
