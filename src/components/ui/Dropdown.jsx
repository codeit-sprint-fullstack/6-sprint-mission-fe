import React from "react";

function Dropdown({ handleSort }) {
  return (
    <ul className="flex flex-col justify-center absolute mt-2 right-4 w-[139px] border-1 border-gray-200 rounded-lg bg-white cursor-pointer">
      <li
        className="text-center w-full pt-4 pb-3 hover:bg-gray-100"
        onClick={() => handleSort("latest")}
      >
        최신순
      </li>
      <li
        className="text-center w-full pt-4 pb-3 hover:bg-gray-100"
        onClick={() => handleSort("oldest")}
      >
        오래된순
      </li>
    </ul>
  );
}

export default Dropdown;
