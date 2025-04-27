"use client";

import React from "react";
import ic_setting from "@/assets/images/community/ic_setting.svg";
import clsx from "clsx";
import Image from "next/image";

export default function DropDownToggle({
  page,
  handleDelete,
  handleEdit,
  handleDropDownToggle,
  isDropDownVisible,
}) {
  return (
    <>
      <button
        onClick={handleDropDownToggle}
        onBlur={handleDropDownToggle}
        className={`relative min-w-[24px] h-[24px] cursor-pointer ${
          page === "article" && "my-[4px]"
        }`}
      >
        <Image src={ic_setting} alt="설정" fill className="object-cover" />
      </button>
      <div
        className={clsx(
          isDropDownVisible ? "block" : "hidden",
          "absolute z-1 bg-white border-[1.3px] border-secondary-gray-200 rounded-[8px] right-[5px] top-[28px]"
        )}
      >
        <button
          onMouseDown={handleEdit}
          className="flex justify-center items-center font-normal text-[14px]/[24px] w-[102px] h-[45px] text-secondary-gray-400 cursor-pointer sm:w-[139px] sm:h-[47px]"
        >
          수정하기
        </button>
        <button
          onMouseDown={handleDelete}
          className="flex justify-center items-center font-normal text-[14px]/[24px] w-[102px] h-[45px] text-secondary-gray-400 cursor-pointer sm:w-[139px] sm:h-[47px]"
        >
          삭제하기
        </button>
      </div>
    </>
  );
}
