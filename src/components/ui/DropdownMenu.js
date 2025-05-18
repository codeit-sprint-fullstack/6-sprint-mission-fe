"use client";

import { useState } from "react";
import Image from "next/image";

export default function DropdownMenu({
  onSortSelection,
  sortOptions,
  selectedKey,
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const selectedOption = sortOptions.find(
    (option) => option.key === selectedKey
  );

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2 text-gray-600"
        onClick={toggleDropdown}
      >
        {selectedOption?.label || "정렬"}
        <Image
          src="/images/icons/ic_arrow_down.svg"
          alt="정렬"
          width={16}
          height={16}
        />
      </button>

      {isDropdownVisible && (
        <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow z-50">
          {sortOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => {
                onSortSelection(option.key);
                setIsDropdownVisible(false);
              }}
              className={`px-6 py-3 text-sm cursor-pointer hover:bg-gray-100 ${
                selectedKey === option.key ? "font-semibold" : "text-gray-800"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
