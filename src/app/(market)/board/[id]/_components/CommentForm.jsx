"use client";

import { createComment } from "@/lib/api/commentApi";
import React, { useState } from "react";

function CommentForm({ articleId, getCommentList }) {
  const [content, setContent] = useState("");

  // 댓글 등록 핸들러
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await createComment(articleId, { content });
    setContent("");

    getCommentList();
  };

  return (
    <>
      <form className="mb-10" onSubmit={handleAddComment}>
        <h3 className="font-semibold">댓글 달기</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[104px] mt-[9px] mb-4 rounded-xl bg-gray-100 px-6 py-4 resize-none"
          placeholder="댓글을 입력해주세요."
        />
        <div className="flex justify-end items-center">
          <button className="btn-base" type="submit" disabled={!content}>
            등록
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
