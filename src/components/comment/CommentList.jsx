"use client";

import EmptyComments from "@/app/community/[id]/_components/EmptyComments";
import CommentItem from "./CommentItem";
import LoadingState from "@/components/common/LoadingState";

export default function CommentList({
  comments,
  loading,
  error,
  onUpdateComment,
  onDeleteComment,
  onSuccess,
  user,
}) {
  if (loading && comments.length === 0) return <LoadingState loading={true} />;
  if (error) return <LoadingState error={error} />;
  if (!comments || comments.length === 0) return <EmptyComments />;

  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onUpdateComment={onUpdateComment}
          onDeleteComment={onDeleteComment}
          onSuccess={onSuccess}
          user={user}
        />
      ))}
    </ul>
  );
}
