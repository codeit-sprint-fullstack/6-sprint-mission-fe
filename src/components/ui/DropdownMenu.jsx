"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function DropdownMenu({orderBy, onSortChange}) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  
  const dropdownRef = useRef(null);

  // if a user clicks outside of dropdown menu, it is closed
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };


  const getDisplayText = () => {
    return orderBy === "recent" ? "최신순" : "좋아요 순"
  }
  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex justify-center items-center p-[9px] rounded-xl border border-secondary-200 hover:bg-secondary-100 cursor-pointer md:w-[130px] md:h-[42px] md:py-3 md:px-5"
        onClick={toggleDropdown}
        aria-expanded={isDropDownVisible}
      >
        <Image
          src="/icons/ic_sort.svg"
          width={24}
          height={24}
          alt="정렬 모바일 아이콘"
          className="block md:hidden"
        ></Image>

        <div className="hidden md:flex md:justify-between md:w-[90px]">
          <p className="">{getDisplayText()}</p>
          <Image src="/icons/arrow_down.svg" width={16} height={8} alt="정렬 화살표"></Image>
        </div>
      </button>
      {isDropDownVisible && (
        <div className="absolute top-[110%] right-0 w-full min-w-[130px] bg-white rounded-lg border border-secondary-200 shadow-sm z-[99] overflow-hidden">
          <button
            className="w-full text-left px-4 py-2 hover:bg-secondary-100 transition-colors"
            onClick={() => {
              onSortChange("recent");
              setIsDropDownVisible(false);
            }}
          >
            최신순
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-secondary-100 transition-colors"
            onClick={() => {
              onSortChange("likes");
              setIsDropDownVisible(false);
            }}
          >
            좋아요 순
          </button>
        </div>
      )}
    </div>
  );
}
