"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

export default function CommonItem({ article }) {
  // 실제 데이터가 없을 경우를 대비한 기본값 처리
  const title = article?.title || "제목 없음";
  const userName = article?.user?.nickname || "판다 유저"; // 백엔드에서 유저 정보 제공시 수정
  const likeCount = article?.likes || 0;
  const createdAt = article?.createdAt
    ? new Date(article.createdAt).toLocaleDateString()
    : "날짜 정보 없음";
  const isLiked = article?.isLiked || false; // 좋아요 여부
  // 썸네일 이미지 경로 - 실제로는 백엔드에서 이미지 URL을 제공하거나 없을 경우 기본 이미지 사용
  const thumbnailSrc = article?.thumbnailUrl || "/img/community_item.png";

  return (
    <li className="w-full">
      <Link href={`/community/${article.id}`}>
        <div className="flex w-full flex-col gap-4">
          <div className="mb-[16px] flex w-full items-center justify-between gap-2">
            <span className="max-w-[80%] text-[18px] font-bold text-[#1f2937] md:text-[20px]">
              {title}
            </span>
            <div className="flex items-center justify-center rounded-xl border-1 border-gray-200 bg-white p-3">
              <figure className="relative h-[48px] w-[48px] bg-amber-600">
                <Image
                  src={thumbnailSrc}
                  alt={title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </figure>
            </div>
          </div>
          <div className="flex w-full justify-between border-b-2 border-gray-200 pb-6">
            <div className="flex h-[24px] items-center gap-2">
              <div>
                <figure className="relative h-[24px] w-[24px]">
                  <Image
                    src="/img/user_icon.png"
                    alt="사용자 아이콘"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </figure>
              </div>
              <span className="text-[14px] font-[500] text-gray-500">
                {userName}
              </span>
              <span className="text-[14px] text-gray-400">{createdAt}</span>
            </div>

            <div className="borderpx-2 flex items-center rounded-full">
              {isLiked ? (
                <FaHeart size={14} className="mr-1 text-red-500" />
              ) : (
                <FaRegHeart size={14} className="mr-1 text-gray-500" />
              )}
              <span className="text-[14px] font-[500] text-gray-500">
                {likeCount > 9999 ? "9999+" : likeCount}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
