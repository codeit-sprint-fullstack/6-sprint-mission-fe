"use client";

import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Link from "next/link";

export default function BestItem({ article }) {
  // 데이터가 없을 경우를 대비한 기본값 처리
  const title = article?.title || "제목 없음";
  const likeCount = article?.likes || 0;
  const createdAt = article?.createdAt
    ? new Date(article.createdAt).toLocaleDateString()
    : "날짜 정보 없음";
  const author = article?.author || "판다 유저";
  const isLiked = article?.isLiked || false; // 좋아요 여부

  // article.image 배열에서 첫 번째 이미지를 썸네일로 사용
  const thumbnailSrc =
    article?.image && article.image.length > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}${article.image[0]}`
      : "/img/community_item.png";

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
          <div className="mb-[40px] flex w-full justify-between gap-2">
            <span className="line-clamp-2 max-w-[65%] overflow-hidden text-[16px] font-bold break-words text-ellipsis md:max-w-[70%] xl:text-[20px]">
              {title}
            </span>

            <div className="flex items-center justify-center rounded-xl border-1 border-gray-200 bg-white">
              <figure className="relative h-[60px] w-[60px] overflow-hidden rounded-xl">
                <Image
                  src={thumbnailSrc}
                  alt={title}
                  fill
                  sizes="60px"
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

            <span className="text-[14px] text-gray-400">{createdAt}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
