import React from "react";
import { CiSearch } from "react-icons/ci";

function Search({ className }) {
  return (
    <>
      <form action="" method="get" className="w-full">
        <div className="relative">
          <input
            type="search"
            placeholder="검색할 상품을 입력해주세요"
            className={`bg-gray-100 h-[42px] pl-[42px] pr-[20px] py-[9px] rounded-[12px] placeholder-gray-400 w-full ${className}`}
          />
          <CiSearch className="absolute top-[13px] left-[20px] text-gray-400 stroke-1" />
        </div>
      </form>
    </>
  );
}

export default Search;
