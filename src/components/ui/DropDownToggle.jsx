"use client";

import React from "react";
import ic_setting from "@/assets/images/community/ic_setting.svg";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function DropDownToggle({
  article,
  handleDropDownToggle,
  handleDropDownClose,
  isDropDownVisible,
}) {
  return (
    <>
      <button
        onClick={handleDropDownToggle}
        className={`relative min-w-[24px] h-[24px] ${
          article && "my-[4px]"
        } cursor-pointer`}
      >
        <Image src={ic_setting} alt="설정" fill className="object-cover" />
      </button>
      <div
        className={clsx(
          isDropDownVisible ? "block" : "hidden",
          "absolute z-1 bg-white border-[1.3px] border-secondary-gray-200 rounded-[8px] right-[5px] top-[28px]"
        )}
      >
        <Link
          href={`${article && `/community/${article.id}/edit`}`}
          onClick={handleDropDownClose}
          className="flex justify-center items-center font-normal text-[14px]/[24px] w-[102px] h-[45px] text-secondary-gray-400 cursor-pointer sm:w-[139px] sm:h-[47px]"
        >
          수정하기
        </Link>
        <Link
          href={`${article && "/community"}`}
          onClick={handleDropDownClose}
          className="flex justify-center items-center font-normal text-[14px]/[24px] w-[102px] h-[45px] text-secondary-gray-400 cursor-pointer sm:w-[139px] sm:h-[47px]"
        >
          삭제하기
        </Link>
      </div>
    </>
  );
}
