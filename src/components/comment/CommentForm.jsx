"use client";

import { addComment } from "@/lib/api/commentApi";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function CommentForm({ productId }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const isDisabled = !content.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const result = await addComment({ productId, content });

    if (result.success) {
      setContent("");
      queryClient.invalidateQueries(["comments", productId]);
    } else {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="text-base font-semibold text-gray-900">댓글달기</div>
      <form onSubmit={handleSubmit} className="w-full mt-[9px]">
        <textarea
          name="content"
          required
          className="w-full h-[104px] px-4 py-6 bg-gray-100 rounded-xl text-sm text-gray-700"
          placeholder="댓글을 입력해주세요."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isDisabled}
            className={`mt-2 w-[74px] h-[42px] text-sm text-white font-semibold rounded-lg
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3692FF] hover:bg-[#267de8]"
            }`}
          >
            등록
          </button>
        </div>
      </form>
    </>
  );
}
