"use client";

import React, { MouseEvent, useState } from "react";
import ic_arrow_down from "@/assets/images/common/select-sort/ic_arrow_down.svg";
import ic_sort from "@/assets/images/common/select-sort/ic_sort.svg";
import Image from "next/image";
import clsx from "clsx";

interface ISelectSortProps {
  changeOrderByInParams: (orderBy: string) => void;
}

export default function SelectSort({
  changeOrderByInParams,
}: ISelectSortProps) {
  const [currentSort, setCurrentSort] = useState("최신순");
  const [isSelectSortBtnVisible, setIsSelectSortBtnVisible] = useState(false);

  // 정렬 선택버튼 토글
  const handleSortSelectBtnToggle = () => {
    setIsSelectSortBtnVisible(!isSelectSortBtnVisible);
  };

  const handleSortSelectBtnClose = () => {
    setIsSelectSortBtnVisible(false);
  };

  // 정렬 선택 시 렌더링
  const handleSortSelectBtn = (
    e: MouseEvent<HTMLButtonElement>,
    orderBy: string
  ): void => {
    setCurrentSort(e.currentTarget.innerText);
    changeOrderByInParams(orderBy);
  };

  return (
    <div>
      <button
        onClick={handleSortSelectBtnToggle}
        onBlur={handleSortSelectBtnClose}
        className="flex justify-center items-center w-[42px] h-[42px] rounded-[12px] border-[1.3px] border-secondary-gray-200 p-[9px] bg-white cursor-pointer sm:hidden "
      >
        <div className="relative w-[24px] h-[24px]">
          <Image
            src={ic_sort}
            alt="정렬 아이콘"
            fill
            className="object-cover"
          />
        </div>
      </button>
      <button
        onClick={handleSortSelectBtnToggle}
        onBlur={handleSortSelectBtnClose}
        className="hidden justify-between items-center w-[130px] h-[42px] rounded-[12px] border-[1.3px] border-secondary-gray-200 py-[12px] px-[20px] bg-white font-normal text-[16px] cursor-pointer sm:flex"
      >
        <p>{currentSort}</p>
        <Image src={ic_arrow_down} alt="정렬 화살표" />
      </button>
      <div
        className={clsx(
          isSelectSortBtnVisible ? "block" : "hidden",
          "absolute z-1 right-0 top-[108px] sm:top-[116px]"
        )}
      >
        <button
          onMouseDown={(e) => handleSortSelectBtn(e, "recent")}
          className="flex justify-center items-center w-[130px] h-[42px] rounded-t-[12px] border-[1.3px] border-secondary-gray-200 border-b-0 py-[20px] px-[12px] gap-[10px] bg-white font-normal text-[16px] cursor-pointer "
        >
          최신순
        </button>
        <button
          onMouseDown={(e) => handleSortSelectBtn(e, "like")}
          className="flex justify-center items-center w-[130px] h-[42px] rounded-b-[12px] border-[1.3px] border-secondary-gray-200 py-[20px] px-[12px] gap-[10px] bg-white font-normal text-[16px] cursor-pointer "
        >
          좋아요순
        </button>
      </div>
    </div>
  );
}
