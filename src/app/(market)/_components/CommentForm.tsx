"use client";

import { Comment } from "@/types";
import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (content: Comment["content"]) => void;
  type?: string;
}

function CommentForm({ onSubmit, type }: CommentFormProps) {
  const [content, setContent] = useState("");

  return (
    <>
      <form
        className="mb-10"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(content);
          setContent("");
        }}
      >
        <h3 className="font-semibold">{type === "product" ? "문의하기" : "댓글 달기"}</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-[9px] mb-4 h-[104px] w-full resize-none rounded-xl bg-gray-100 px-6 py-4"
          placeholder={
            type === "product"
              ? "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              : "댓글을 입력해주세요."
          }
        />
        <div className="flex items-center justify-end">
          <button className="btn-base" type="submit" disabled={!content}>
            등록
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
