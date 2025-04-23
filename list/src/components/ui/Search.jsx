"use client";

import React, { useState } from "react";

export default function Search() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full">
      <div className="flex items-center bg-gray-100 rounded-[12px] px-4 py-2">
        <svg
          className="w-5 h-5 text-gray-400 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="검색할 상품을 입력해주세요"
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
