"use client";

import React, { useState } from "react";
import Image from "next/image";
import ic_profile from "@/assets/images/common/ic_profile.svg";
import DropDownToggle from "@/components/ui/DropDownToggle";

export default function CommentsLoad({ comment }) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  return (
    <>
      <div className="flex flex-col gap-y-[8px] sm:gap-y-[12px]">
        <div className="flex flex-col gap-y-[24px]">
          <div className="relative flex justify-between gap-[8px]">
            <p className="font-normal text-[14px]/[24px]">{comment.content}</p>
            <DropDownToggle
              handleDropDownToggle={handleDropDownToggle}
              handleDropDownClose={handleDropDownClose}
              isDropDownVisible={isDropDownVisible}
            />
          </div>
          <div className="flex justify-start items-center font-normal text-[12px]/[18px]">
            <div className="flex justify-center items-center gap-[8px]">
              <div className="relative w-[32px] h-[32px]">
                <Image
                  src={ic_profile}
                  alt="프로필"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-[4px] ">
                <p className="text-secondary-gray-500">똑똑한 판다</p>
                <p className="text-secondary-gray-300">{comment.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-[1.3px] border-secondary-gray-200"></div>
      </div>
    </>
  );
}
