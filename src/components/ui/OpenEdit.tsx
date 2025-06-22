"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { OpenEditProps } from "@/types";

export default function Dropdown({ onSelectSort }: OpenEditProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortSelect = (sort: "recent" | "favorite") => {
    onSelectSort(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[8px] bg-primary-100 rounded-[12px] px-[16px] py-[9px] cursor-pointer"
      >
        <span className="text-[16px] text-primary-800">정렬</span>
        <Image
          src="/ic_arrow_down.svg"
          alt="arrow"
          width={24}
          height={24}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-primary-200 rounded-[8px] shadow-lg z-10 min-w-[120px]">
          <button
            onClick={() => handleSortSelect("recent")}
            className="block w-full text-left px-[16px] py-[12px] text-[14px] text-primary-800 hover:bg-primary-50 rounded-t-[8px]"
          >
            최신순
          </button>
          <button
            onClick={() => handleSortSelect("favorite")}
            className="block w-full text-left px-[16px] py-[12px] text-[14px] text-primary-800 hover:bg-primary-50 rounded-b-[8px]"
          >
            인기순
          </button>
        </div>
      )}
    </div>
  );
}
