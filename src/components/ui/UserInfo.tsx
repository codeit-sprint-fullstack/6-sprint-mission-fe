"use client";

import React from "react";
import FormatDate from "./FormatDate";
import Image from "next/image";
import { Product, User } from "@/types";

interface UserInfoProps {
  nickname: User["nickname"];
  createdAt: Product["createdAt"];
  favoriteCount: Product["favoriteCount"];
  isItemPage?: boolean;
  isLiked?: boolean;
  onToggleLike: () => void;
}

function UserInfo({
  nickname,
  createdAt,
  favoriteCount,
  isItemPage,
  isLiked,
  onToggleLike,
}: UserInfoProps) {
  return (
    <div className={`flex items-center ${isItemPage ? "justify-between" : "my-4"} `}>
      <span className="flex items-center gap-4">
        <Image src="/assets/icon/ic_profile.svg" alt="기본 프로필 아이콘" width={40} height={40} />
        <div className={`${isItemPage ? "" : "flex"} gap-0.5 text-sm md:gap-2`}>
          <div className="font-medium text-gray-600">{nickname}</div>
          <FormatDate createdAt={createdAt} />
        </div>
      </span>
      <span className="flex items-center">
        <span
          className={`mx-4 h-10 border-r-1 border-gray-200 ${
            isItemPage ? "" : "md:mx-8"
          } gap-0.5 text-sm md:gap-2`}
        ></span>
        <button
          className="flex h-[34px] items-center gap-1 rounded-[35px] border-1 border-gray-200 px-3 py-1 lg:h-[40px]"
          onClick={onToggleLike}
        >
          <Image
            src={isLiked ? "/assets/icon/ic_heart.svg" : "/assets/icon/ic_unheart.svg"}
            alt="좋아요 아이콘"
            width={24}
            height={24}
            className={isItemPage ? "" : `md:h-8 md:w-8`}
          />
          <span className="font-medium text-gray-500">{favoriteCount}</span>
        </button>
      </span>
    </div>
  );
}

export default UserInfo;
