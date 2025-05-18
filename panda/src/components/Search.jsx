import React from "react";
import { CiSearch } from "react-icons/ci";
import "./css/input.scss";

function Search({ className, value, onChange }) {
  return (
    <form action="" method="get" className="w-full">
      <div className="relative">
        <input
          type="search"
          placeholder="검색할 상품을 입력해주세요"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`input h-[42px] !pl-[42px] !py-[9px] ${className}`}
        />
        <CiSearch className="absolute top-[13px] left-[20px] text-gray-400 stroke-1" />
      </div>
    </form>
  );
}

export default Search;
