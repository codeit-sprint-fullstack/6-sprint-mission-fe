"use client";

import { useState, useEffect } from "react";
import { useComments } from "@/hooks/Article";

export default function CommentForm({ parentId, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment } = useComments(parentId);

  useEffect(() => {
    setIsValid(comment.trim().length > 0);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await addComment({ content: comment });
      setComment("");

      // 부모 컴포넌트에 댓글이 추가되었음을 알림
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="mb-2 rounded-lg bg-gray-100 p-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="h-24 w-full resize-none bg-transparent p-2 focus:outline-none"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`rounded-md px-6 py-2 text-sm font-medium text-white transition-colors ${
            isValid && !isSubmitting
              ? "cursor-pointer bg-[#3692FF] hover:bg-blue-600"
              : "cursor-not-allowed bg-gray-400"
          }`}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </form>
  );
}
