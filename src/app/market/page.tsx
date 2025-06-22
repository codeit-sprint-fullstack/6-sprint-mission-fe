"use client";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/OpenEdit";
import Image from "next/image";
import React, { useState } from "react";
import MaketProductList from "./_component/MarketProductList";
import BestProductList from "./_component/BestProductList";

export default function MarketPage() {
  const [sortOption, setSortOption] = useState("recent");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSortSelect = (sort: string) => {
    setSortOption(sort);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div className="flex flex-col items-center mb-[43px]">
      <div>
        <p>베스트 상품</p>
        <div>
          <BestProductList />
        </div>
      </div>

      <div className="mt-[26px]">
        <div className="flex items-center justify-between w-[1200px]">
          <p className="text-[20px] text-primary-800 font-bold">
            판매 중인 상품
          </p>
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center bg-primary-100 rounded-[12px] pl-[16px] pr-[20px] py-[9px] w-[325px] h-[42px]">
              <Image
                src="/ic_search.svg"
                alt="search"
                width={24}
                height={24}
                className="mr-1 cursor-pointer"
              />
              <input
                type="text"
                placeholder="검색할 상품을 입력하세요"
                value={searchKeyword}
                onChange={handleSearchChange}
                className="text-base text-primary-400 outline-none w-full bg-transparent"
              />
            </div>
            <Button className="py-[8px]" buttonText={"상품 등록하기"} />
            <Dropdown onSelectSort={handleSortSelect} />
          </div>
        </div>

        <MaketProductList
          sortOption={sortOption}
          searchKeyword={searchKeyword}
        />
      </div>
    </div>
  );
}
