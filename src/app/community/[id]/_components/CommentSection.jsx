"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import BackToList from "./BackToList";

export default function CommentSection({ articleId }) {
  // 댓글 추가 시 강제로 리렌더링하기 위한 상태
  const [refreshKey, setRefreshKey] = useState(0);

  // 댓글 추가 후 리렌더링을 위한 함수
  const handleCommentAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 font-bold">댓글달기</h3>

      {/* 댓글 작성 폼 */}
      <CommentForm articleId={articleId} onCommentAdded={handleCommentAdded} />

      {/* 댓글 목록 - key 변경으로 강제 리렌더링 */}
      <CommentList key={refreshKey} articleId={articleId} />

      {/* 목록으로 돌아가기 */}
      <BackToList />
    </div>
  );
}
