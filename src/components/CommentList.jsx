import CommentItem from "@/components/CommentItem";

export default function CommentList({
  comments,
  onEditComment,
  onDeleteComment,
  editingCommentId,
  editingCommentContent,
  onEditingContentChange,
  onSaveEdit,
  onCancelEdit,
  isSavingEdit,
  deletingCommentId,
}) {
  return (
    <div className="space-y-6">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
            isEditing={editingCommentId === comment.id}
            editingContent={
              editingCommentId === comment.id ? editingCommentContent : ""
            }
            onEditingContentChange={onEditingContentChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            isSavingEdit={isSavingEdit && editingCommentId === comment.id}
            isDeleting={deletingCommentId === comment.id}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 pt-10">아직 댓글이 없습니다.</p>
      )}
    </div>
  );
}
