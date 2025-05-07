"use client";

import React from "react";

function Dropdown({ items = [], onSelect, isSort }) {
  return (
    <ul
      className={`absolute border-1 border-gray-200 bg-white cursor-pointer overflow-hidden z-1 ${
        isSort
          ? "right-4 md:right-6 lg:right-[12rem] mt-1 w-[130px] rounded-xl"
          : "right-[21px] lg:right-[12rem] mt-[10px] w-[102px] md:w-[139px] rounded-lg"
      }`}
    >
      {items.map(({ label, value }) => (
        <li
          key={value}
          className="flex justify-center items-center w-full h-[45px] md:h-[47px] hover:bg-gray-100"
          onClick={() => onSelect(value)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
