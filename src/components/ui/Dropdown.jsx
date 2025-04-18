"use client";

import React from "react";

function Dropdown({ items = [], onSelect }) {
  return (
    <ul className="absolute right-[21px] w-[102px] md:w-[139px] border-1 border-gray-200 rounded-lg bg-white cursor-pointer overflow-hidden z-1">
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
