"use client";

import { useComments } from "@/hooks/Article";
import CommentItem from "./CommentItem";
import EmptyComments from "./EmptyComments";
import { useCallback } from "react";
import LoadingState from "@/components/common/LoadingState";
import { Article } from "@/types/article";
import { Product } from "@/types/product";

export default function CommentList({
  parent,
  articleId,
}: {
  parent: Article | Product;
  articleId: string;
}) {
  // articleId를 직접 사용
  const { comments, loading, error, refetch } = useComments(articleId);

  // 댓글 업데이트 후 새로고침
  const handleCommentUpdated = useCallback(() => {
    refetch();
  }, [refetch]);

  // 댓글 로딩 상태 처리
  if (loading || error) {
    return (
      <LoadingState
        loading={loading}
        error={error}
        loadingMessage="댓글을 불러오는 중..."
        errorMessage="댓글을 불러오는데 실패했습니다."
        isEmpty={!loading && !error && !comments}
        emptyMessage="댓글이 없습니다."
      />
    );
  }

  // 댓글이 없는 경우
  if (!comments || comments.length === 0) {
    return <EmptyComments />;
  }

  // 댓글이 있는 경우
  return (
    <ul className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          parent={parent}
          onCommentUpdated={handleCommentUpdated}
        />
      ))}
    </ul>
  );
}
