import Image from "next/image";
import React from "react";

interface SearchProps {
  setSearch: (value: string) => void;
}

function Search({ setSearch }: SearchProps) {
  return (
    <div className="flex-1 flex items-center bg-gray-200 rounded-xl h-11 pl-4">
      <Image
        alt="search"
        src="/assets/ic/ic_search.png"
        width={16}
        height={16}
      />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        className=" w-full pl-1"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
