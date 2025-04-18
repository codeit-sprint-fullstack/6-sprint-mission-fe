"use client";

import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import Link from "next/link";

export default function BestItem({ article }) {
  // 데이터가 없을 경우를 대비한 기본값 처리
  const title = article?.title || "제목 없음";
  const likeCount = article?.likes || 0;
  const createdAt = article?.createdAt
    ? new Date(article.createdAt).toLocaleDateString()
    : "날짜 정보 없음";
  const author = article?.author || "사용자";

  // 썸네일 이미지 경로
  const thumbnailSrc = article?.thumbnailUrl || "/img/community_item.png";

  return (
    <li className="flex w-full flex-col gap-5">
      <Link href={`/community/${article.id}`} className="w-full">
        <div className="flex flex-col rounded-lg border border-gray-200 bg-gray-100 px-6 transition hover:border-blue-200 hover:bg-blue-50">
          {/* 베스트 아이콘 */}
          <div className="relative mb-[16px] flex h-[30px] w-[100px] items-center justify-center gap-2 rounded-br-2xl rounded-bl-2xl bg-[#3692FF]">
            <figure className="relative flex h-[14px] w-[14px]">
              <Image
                src="/img/best_icon.png"
                alt="베스트"
                fill
                sizes="14px"
                className="object-cover"
              />
            </figure>
            <span className="text-[16px] font-bold text-white">Best</span>
          </div>

          {/* 상품 정보 */}
          <div className="mb-[40px] flex w-full items-center justify-between gap-2">
            <span className="line-clamp-2 max-w-[65%] overflow-hidden text-[16px] font-bold break-words text-ellipsis md:max-w-[70%] xl:text-[20px]">
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

          {/* 추가 정보 */}
          <div className="flex justify-between pb-4">
            <div className="flex h-[24px] max-w-[150px] items-center gap-2">
              <span className="text-[14px] font-[500] text-gray-500">
                {author}
              </span>
              <div className="flex items-center gap-1">
                <FaRegHeart size={16} color="gray" />
                <span className="text-[14px] font-[500] text-gray-500">
                  {likeCount > 9999 ? "9999+" : likeCount}
                </span>
              </div>
            </div>

            <span className="text-[14px] text-gray-400">{createdAt}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
