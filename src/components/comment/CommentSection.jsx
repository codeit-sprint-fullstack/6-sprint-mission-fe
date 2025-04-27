"use client";

import { useComments } from "@/hooks/Comment";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import BackToList from "./BackToList";

export default function CommentSection({ type, parentId }) {
  const {
    comments,
    loading,
    error,
    addComment,
    updateComment,
    deleteComment,
    refetch,
  } = useComments(type, parentId);

  return (
    <div>
      <CommentForm addComment={addComment} onSuccess={refetch} />
      <CommentList
        comments={comments}
        loading={loading}
        error={error}
        onUpdateComment={updateComment}
        onDeleteComment={deleteComment}
        onSuccess={refetch}
      />
      <BackToList />
    </div>
  );
}
