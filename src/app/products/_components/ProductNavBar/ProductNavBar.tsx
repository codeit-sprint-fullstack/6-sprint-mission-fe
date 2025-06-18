"use client";

import Link from "next/link";
import React from "react";
import ProductSearchBox from "./ProductSearchBox";
import ProductSelectSort from "./ProductSelectSort";

interface IProductNavBarProps {
  changeKeywordInParams: (keyword: string) => void;
  changeOrderByInParams: (orderBy: string) => void;
}

export default function ProductNavBar({
  changeKeywordInParams,
  changeOrderByInParams,
}: IProductNavBarProps) {
  return (
    <div className="flex justify-center">
      <div className="relative flex flex-col justify-between gap-[16px] items-between w-full mt-[24px] mb-[16px] sm:flex-row sm:mt-[40px] sm:mb-[24px] md:mt-[26px]">
        <h2 className="font-bold text-[20px]/[42px] min-w-[113px]">
          판매 중인 상품
        </h2>
        <nav className="flex justify-end items-center w-full gap-[13px] sm:gap-[12px]">
          <ProductSearchBox changeKeywordInParams={changeKeywordInParams} />
          <Link
            href="/products/create"
            className="absolute top-0 right-0 flex justify-center items-center bg-primary-100 hover:bg-primary-200 active:bg-primary-300 h-[42px] min-w-[133px] rounded-[8px] py-3 px-[21px] text-[16px] font-semibold text-white sm:static"
          >
            상품 등록하기
          </Link>
          <ProductSelectSort changeOrderByInParams={changeOrderByInParams} />
        </nav>
      </div>
    </div>
  );
}
