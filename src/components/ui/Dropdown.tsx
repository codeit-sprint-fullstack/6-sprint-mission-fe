"use client";

import { DropdownItem } from "@/types";
import React from "react";

interface DropdownProps {
  items: DropdownItem[];
  onSelect: (value: DropdownItem["value"]) => void;
  type?: "sort" | "edit";
}

function Dropdown({ items, onSelect, type }: DropdownProps) {
  return (
    <ul
      className={`absolute z-1 cursor-pointer overflow-hidden border-1 border-gray-200 bg-white ${
        type === "sort"
          ? "right-0 mt-1 w-[130px] rounded-xl"
          : "right-[21px] mt-[10px] w-[102px] rounded-lg md:w-[139px] lg:right-[12rem]"
      }`}
    >
      {items.map(({ label, value }) => (
        <li
          key={value}
          className="flex h-[45px] w-full items-center justify-center hover:bg-gray-100 md:h-[47px]"
          onClick={() => onSelect(value)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
