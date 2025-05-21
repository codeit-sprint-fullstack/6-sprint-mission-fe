"use client";

import { useParams } from "next/navigation";
import React from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { useQuery } from "@tanstack/react-query";
import { commentService } from "@/service/commentService";

export default function Comments() {
  const { articleId, productId } = useParams();

  const type = articleId ? "articles" : "products";
  const id = articleId || productId;

  // 댓글 조회
  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
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
      <CommentList isPending={isPending} comments={comments} />
    </div>
  );
}
