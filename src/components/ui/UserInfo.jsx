"use client";

import React from "react";
import FormatDate from "./FormatDate";
import Image from "next/image";

function UserInfo({ article, isItemPage, item }) {
  return (
    <div
      className={`flex ${
        isItemPage ? "justify-between" : ""
      } items-center my-4`}
    >
      <span className="flex items-center gap-4">
        <Image
          src="/assets/icon/ic_profile.svg"
          alt="기본 프로필 아이콘"
          width={40}
          height={40}
        />
        <div className={`${isItemPage ? "" : "flex"} gap-0.5 md:gap-2 text-sm`}>
          <div className="font-medium text-gray-600">총명한 판다</div>
          <FormatDate createdAt={article?.createdAt} />
        </div>
      </span>
      <span className="flex">
        <span
          className={`h-10 border-r-1 border-gray-200 mx-4 ${
            isItemPage ? "" : "md:mx-8"
          } gap-0.5 md:gap-2 text-sm`}
        ></span>
        <button className="flex items-center px-3 py-1 border-1 border-gray-200 rounded-[35px] gap-1">
          <Image
            src="/assets/icon/ic_unheart.svg"
            alt="좋아요 아이콘"
            width={24}
            height={24}
            className="md:w-8 md:h-8"
          />
          <span className="font-medium text-gray-500">
            {item?.favoriteCount}
          </span>
        </button>
      </span>
    </div>
  );
}

export default UserInfo;
