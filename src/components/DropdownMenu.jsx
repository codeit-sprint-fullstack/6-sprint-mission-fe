"use client";

import React, { useState } from "react";

function DropdownMenu({ onSortSelection }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("최신순");

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleSelect = (type) => {
    const label = type === "recent" ? "최신순" : "인기순";
    setSelectedLabel(label);
    onSortSelection(type);
    setIsDropdownVisible(false);
  };

  return (
    <div className="relative">
      {/* 버튼 */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
      >
        <span>{selectedLabel}</span>
        <img
          src="/icons/ic_arrow_down.svg"
          alt="아래 화살표"
          className="w-3 h-3"
        />
        {/* 또는 ▼ 로도 가능: <span className="text-xs">▼</span> */}
      </button>

      {/* 드롭다운 메뉴 */}
      {isDropdownVisible && (
        <div className="absolute top-[110%] right-0 bg-white rounded-lg border border-gray-200 shadow z-[99] min-w-max">
          <div
            className="px-6 py-2 border-b border-gray-200 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
            onClick={() => handleSelect("recent")}
          >
            최신순
          </div>
          <div
            className="px-6 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
            onClick={() => handleSelect("favorite")}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
