"use client";

import { useState } from "react";
import { postComment } from "@/lib/api";

export default function AddComment({ articleId, boardType }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await postComment(boardType, articleId, { content: comment });
      setComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-10">
      <div className="mb-4">
        <span className="flex mb-[9px] text-4 font-semibold text-secondary">
          댓글달기
        </span>
        <textarea
          className="w-full px-6 py-4 bg-primary-100 rounded-[12px] text-primary-400 text-[16px] font-normal"
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleCommentSubmit}
          disabled={!comment.trim() || isSubmitting}
          className={`cursor-pointer px-[23px] py-[8px] rounded-[8px] text-[16px] font-semibold text-white  ${
            !comment.trim() || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary"
          }`}
        >
          {isSubmitting ? "등록 중" : "등록"}
        </button>
      </div>
    </div>
  );
}
