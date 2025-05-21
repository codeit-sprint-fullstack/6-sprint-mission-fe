"use client";

import likeButton from "@/src/assets/likebt.png";
import dislikeButton from "@/src/assets/dislikebt.png";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, toggleProductLike } from "@/src/api/Product/Product";
import { useState, useEffect } from "react";

export default function LikeButton({ id, type, favoriteCount }) {
  const queryClient = useQueryClient();
  const queryKey = [type, id];

  const { data } = useQuery({
    queryKey,
    queryFn: () => fetchProduct(id),
  });

  // 1. 좋아요 카운트 추출 (fallback: 0)
  const likeCount =
    typeof data?.favoriteCount === "number"
      ? data.favoriteCount
      : typeof favoriteCount === "number"
      ? favoriteCount
      : 0;

  // 2. 좋아요 상태를 로컬에서 직접 관리 (초기값: false)
  const [isLiked, setIsLiked] = useState(false);

  const mutation = useMutation({
    mutationFn: () => toggleProductLike(id),
    onSuccess: (res) => {
      setIsLiked(res.liked); // ✅ 서버 응답에 따라 하트 상태 반영
      queryClient.invalidateQueries(queryKey); // ✅ 카운트 새로고침
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="flex flex-row gap-[0.25rem] btn-primary bg-white rounded-3xl border border-gray-200 ml-[1.5rem] w-[5.5rem]"
    >
      <Image
        key={isLiked ? "liked" : "unliked"}
        src={isLiked ? dislikeButton : likeButton}
        alt={isLiked ? "좋아요됨" : "좋아요안됨"}
        width={16}
        height={16}
      />
      <span className="text-[#6B7280]">{likeCount}</span>
    </button>
  );
}
