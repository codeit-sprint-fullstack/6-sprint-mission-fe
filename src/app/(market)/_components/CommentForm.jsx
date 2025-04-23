"use client";

import { createComment } from "@/lib/commentApi";
import React, { useState } from "react";

function CommentForm({ articleId, getCommentList, isItemPage }) {
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
        <h3 className="font-semibold">
          {isItemPage ? "문의하기" : "댓글 달기"}
        </h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[104px] mt-[9px] mb-4 rounded-xl bg-gray-100 px-6 py-4 resize-none"
          placeholder={
            isItemPage
              ? "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              : "댓글을 입력해주세요."
          }
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
