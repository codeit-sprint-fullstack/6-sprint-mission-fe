"use client";

import React from "react";
import Image from "next/image";
import ic_profile from "@/assets/images/common/ic_profile.svg";
import ic_full_heart from "@/assets/images/common/ic_full_heart.svg";
import ic_empty_heart from "@/assets/images/common/ic_empty_heart.svg";
import dayjs from "dayjs";
import clsx from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/service/postService";
import { useParams } from "next/navigation";

export default function Profile({ article = null, product = null }) {
  const { articleId, productId } = useParams();
  const queryClient = useQueryClient();

  const type = article ? "articles" : "products";
  const id = articleId || productId;

  // 유저 좋아요 리스트
  const { data, isPending, error } = useQuery({
    queryKey: [type, id],
    queryFn: () => postService.getPost(type, id),
  });

  // 좋아요 API
  const { mutate: addLike } = useMutation({
    mutationFn: ({ type, id }) => postService.like(type, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type, id] });
    },
  });

  // 좋아요 취소 API
  const { mutate: removeLike } = useMutation({
    mutationFn: ({ type, id }) => postService.unlike(type, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type, id] });
    },
  });

  // 좋아요 기능
  const handleLike = () => {
    if (data?.isLiked) {
      return removeLike({ type, id });
    }

    addLike({ type, id });
  };

  return (
    <div
      className={clsx(
        article ? "justify-start" : "justify-between",
        "flex items-center gap-[16px]"
      )}
    >
      <div className="flex justify-center items-center gap-[16px]">
        <div className="relative w-[40px] h-[40px]">
          <Image src={ic_profile} alt="프로필" fill className="object-cover" />
        </div>
        <div
          className={clsx(
            article ? "gap-[8px]" : "flex-col gap-[2px]",
            "flex justify-center items-start"
          )}
        >
          <p className="text-[14px]/[24px] font-medium text-secondary-gray-500">
            {article ? article?.author?.nickname : product?.author?.nickname}
          </p>
          <p className="text-[14px]/[24px] font-normal text-secondary-gray-300">
            {dayjs(article ? article?.createdAt : product.createdAt).format(
              "YYYY. MM. DD"
            )}
          </p>
        </div>
      </div>
      <div className="flex gap-[16px]">
        <div className="border-l-[1px] border-secondary-gray-200"></div>
        <div
          onClick={handleLike}
          className="cursor-pointer flex justify-center items-center rounded-[35px] border-[1.3px] border-secondary-gray-200 py-[4px] px-[12px] gap-[4px]"
        >
          <div className="relative w-[24px] h-[24px]">
            <Image
              src={data?.isLiked ? ic_full_heart : ic_empty_heart}
              alt="하트"
              fill
              className="object-cover"
            />
          </div>
          <p className="font-medium text-[16px] text-secondary-gray-400">
            {article ? article?.likeCount : product?.likeCount}
          </p>
        </div>
      </div>
    </div>
  );
}
