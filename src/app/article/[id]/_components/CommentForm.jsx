"use client";

import { postComment } from "@/api/articleApi";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { id: articleId } = useParams();

  const handleClick = async () => {
    try {
      console.log(comment);
      const result = await postComment({ content: comment }, articleId);
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setComment("");
    }
  };

  return (
    <article className="mb-[24px]">
      <p className="font-[600] text-[#111827] mb-[8px]">댓글달기</p>
      <textarea
        className="w-full h-[104px] bg-[#F3F4F6] px-[24px] pt-[16px] rounded-[12px] mb-[16px] resize-none outline-none"
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="w-full flex justify-end">
        <button
          className="bg-[var(--color-main-blue)] w-[74px] h-[42px] text-white font-[600] rounded-[8px] cursor-pointer"
          onClick={handleClick}
        >
          등록
        </button>
      </div>
    </article>
  );
};

export default CommentForm;
