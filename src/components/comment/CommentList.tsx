"use client";

import EmptyComments from "@/app/community/[id]/_components/EmptyComments";
import CommentItem from "./CommentItem";
import LoadingState from "@/components/common/LoadingState";
import { User } from "@/types/user";
import { Comment } from "@/types/comment";

export default function CommentList({
  comments,
  loading,
  error,
  onUpdateComment,
  onDeleteComment,
  onSuccess,
  user,
}: {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  onUpdateComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  onSuccess: () => void;
  user: User | null;
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
