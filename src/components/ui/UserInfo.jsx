"use client";

import React from "react";
import FormatDate from "./FormatDate";
import Image from "next/image";

function UserInfo({
  nickname,
  createdAt,
  favoriteCount,
  isItemPage,
  isLiked,
  onToggleLike,
}) {
  return (
    <div
      className={`flex items-center ${
        isItemPage ? "justify-between" : "my-4"
      } `}
    >
      <span className="flex items-center gap-4">
        <Image
          src="/assets/icon/ic_profile.svg"
          alt="기본 프로필 아이콘"
          width={40}
          height={40}
        />
        <div className={`${isItemPage ? "" : "flex"} gap-0.5 md:gap-2 text-sm`}>
          <div className="font-medium text-gray-600">{nickname}</div>
          <FormatDate createdAt={createdAt} />
        </div>
      </span>
      <span className="flex items-center">
        <span
          className={`h-10 border-r-1 border-gray-200 mx-4 ${
            isItemPage ? "" : "md:mx-8"
          } gap-0.5 md:gap-2 text-sm`}
        ></span>
        <button
          className="flex items-center h-[34px] lg:h-[40px] px-3 py-1 border-1 border-gray-200 rounded-[35px] gap-1"
          onClick={onToggleLike}
        >
          <Image
            src={
              isLiked
                ? "/assets/icon/ic_heart.svg"
                : "/assets/icon/ic_unheart.svg"
            }
            alt="좋아요 아이콘"
            width={24}
            height={24}
            className={isItemPage ? "" : `md:w-8 md:h-8`}
          />
          <span className="font-medium text-gray-500">{favoriteCount}</span>
        </button>
      </span>
    </div>
  );
}

export default UserInfo;
