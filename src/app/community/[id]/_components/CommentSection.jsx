"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import BackToList from "./BackToList";

export default function CommentSection({ parent }) {
  // 댓글 추가 시 강제로 리렌더링하기 위한 상태
  const [refreshKey, setRefreshKey] = useState(0);

  // parent 객체에서 ID 추출 (API 응답 구조 변경에 대응)
  const articleId = parent?.data?.id || parent?.id;

  // 댓글 추가 후 리렌더링을 위한 함수
  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!articleId) {
    console.error("CommentSection: 게시글 ID를 찾을 수 없습니다", parent);
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="mb-4 font-bold">댓글달기</h3>

      {/* 댓글 작성 폼 */}
      <CommentForm parentId={articleId} onCommentAdded={handleCommentAdded} />

      {/* 댓글 목록 - key 변경으로 강제 리렌더링 */}
      <CommentList key={refreshKey} parent={parent} articleId={articleId} />

      {/* 목록으로 돌아가기 */}
      <BackToList />
    </div>
  );
}
