"use client";

import { useParams } from "next/navigation";
import React from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { useQuery } from "@tanstack/react-query";
import { commentService } from "@/service/commentService";

type TComments = ({
  author: {
    id: string;
    nickname: string;
  };
} & {
  id: number;
  createdAt: Date;
  content: string;
})[];

export default function Comments() {
  const { articleId, productId } = useParams<{
    articleId: string;
    productId: string;
  }>();

  const type = articleId ? "articles" : "products";
  const id = articleId || productId;

  // 댓글 조회
  const {
    data: comments,
    isPending,
    error,
  } = useQuery<TComments, Error, TComments, [string, string]>({
    queryKey: ["comments", id],
    queryFn: () => commentService.getComments(type, id),
  });

  if (error) {
    return (
      <div className="flex justify-center items-center">{error.message}</div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-[24px] sm:gap-[32px] md:gap-[40px]">
      <CommentCreate />
      <div className="flex flex-col justify-center items-center w-full gap-[40px] sm:gap-[48px]">
        {isPending ? (
          <div className="flex justify-center items-center gap-[8px]">
            <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
            <p className="font-medium">불러오는 중</p>
          </div>
        ) : (
          <CommentList comments={comments} />
        )}
      </div>
    </div>
  );
}
