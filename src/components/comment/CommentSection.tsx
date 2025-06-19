"use client";

import { useComments } from "@/hooks/Comment";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import BackToList from "./BackToList";
import { User } from "@/types/user";

export default function CommentSection({
  type,
  parentId,
  user,
}: {
  type: string;
  parentId: string;
  user: User;
}) {
  const { comments, loading, error, addComment, updateComment, deleteComment } =
    useComments(type, parentId);

  return (
    <div>
      <CommentForm addComment={addComment} />
      <CommentList
        comments={comments}
        loading={loading}
        error={error}
        onUpdateComment={updateComment}
        onDeleteComment={deleteComment}
        user={user}
      />
      <BackToList />
    </div>
  );
}
