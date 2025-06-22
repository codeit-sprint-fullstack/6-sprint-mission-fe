"use client";

import React, { useState } from "react";
import { createComment } from "@/lib/commentApi";

interface AddCommentProps {
  articleId: number;
  boardType: string;
}

export default function AddComment({ articleId, boardType }: AddCommentProps) {
  const [content, setContent] = useState("");
  const [token, setToken] = useState<string | null>(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await createComment(articleId, { content }, token);
      setContent("");
      // 댓글 목록 새로고침을 위해 부모 컴포넌트에 알림
      window.location.reload();
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">댓글 작성</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          댓글 작성
        </button>
      </form>
    </div>
  );
}
