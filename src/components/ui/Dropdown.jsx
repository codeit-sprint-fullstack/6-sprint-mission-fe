"use client";

import React from "react";

function Dropdown({ items = [], onSelect }) {
  return (
    <ul className="flex flex-col justify-center absolute mt-2 right-4 w-[102px] border-1 border-gray-200 rounded-lg bg-white cursor-pointer overflow-hidden">
      {items.map(({ label, value }) => (
        <li
          key={value}
          className="text-center w-full pt-4 pb-3 hover:bg-gray-100"
          onClick={() => onSelect(value)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
