"use client";

import React, { useEffect, useState } from "react";
import ic_arrow_left from "@/assets/images/products/ic_arrow_left.svg";
import ic_arrow_right from "@/assets/images/products/ic_arrow_right.svg";
import Image from "next/image";
import clsx from "clsx";

export default function Pagination({
  currentDevice,
  params,
  totalCount,
  changeOffsetInParams,
}) {
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지, 페이지 번호 초기화(정렬 선택 or 검색 시)
  useEffect(() => {
    setCurrentPage(1);
    setPages([1, 2, 3, 4, 5]);
  }, [params.orderBy, params.keyword, currentDevice]);

  // 렌더링(현재 페이지 변경 시) & 페이지 버튼 액티브 효과
  useEffect(() => {
    changeOffsetInParams(currentPage);
  }, [currentPage]);

  // 페이지 이동
  const handlePageBtn = (e) => {
    setCurrentPage(Number(e.target.innerText));
  };

  // 이전 페이지
  const decreasePage = () => {
    if (currentPage <= 5) return;
    const prevPages = pages.map((page) => page - 5);

    setPages(prevPages);
    setCurrentPage(prevPages[4]);
  };

  // 다음 페이지
  const increasePage = () => {
    const nextPages = pages.map((page) => page + 5);
    if (nextPages[0] > Math.ceil(totalCount / params.limit)) return;

    setPages(nextPages);
    setCurrentPage(nextPages[0]);
  };

  return (
    <div className="flex justify-center items-center gap-[4px] my-[40px]">
      <button
        onClick={decreasePage}
        className="flex justify-center items-center w-[40px] h-[40px] border-[1.3px] border-secondary-gray-200 rounded-[40px] bg-white cursor-pointer"
      >
        <div className="relative w-[16px] h-[16px]">
          <Image
            src={ic_arrow_left}
            alt="왼쪽 화살표"
            fill
            className="object-cover"
          />
        </div>
      </button>
      {pages.map((page) => {
        if (page > Math.ceil(totalCount / params.limit)) return;
        return (
          <button
            key={page}
            onClick={handlePageBtn}
            className={clsx(
              page === currentPage
                ? "border-none bg-primary-100 text-white"
                : "border-[1.3px] border-secondary-gray-200 bg-white text-secondary-gray-400",
              "flex justify-center items-center w-[40px] h-[40px] rounded-[40px] font-semibold text-[16px]/[26px] cursor-pointer"
            )}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={increasePage}
        className="flex justify-center items-center w-[40px] h-[40px] border-[1.3px] border-secondary-gray-200 rounded-[40px] bg-white cursor-pointer"
      >
        <div className="relative w-[16px] h-[16px]">
          <Image
            src={ic_arrow_right}
            alt="오른쪽 화살표"
            fill
            className="object-cover"
          />
        </div>
      </button>
    </div>
  );
}
