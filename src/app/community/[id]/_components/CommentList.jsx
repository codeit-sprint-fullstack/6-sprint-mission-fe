"use client";

import { useComments } from "@/hooks/useArticle";
import CommentItem from "./CommentItem";
import LoadingState from "./LoadingState";
import EmptyComments from "./EmptyComments";

export default function CommentList({ articleId }) {
  const { comments, loading, error } = useComments(articleId);

  // 댓글 로딩 상태 처리
  if (loading || error) {
    return (
      <LoadingState
        loading={loading}
        error={error}
        loadingMessage="댓글을 불러오는 중..."
        errorMessage="댓글을 불러오는데 실패했습니다."
        className="min-h-[100px] py-8"
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
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
