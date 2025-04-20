import CommentCard from "./CommentCard";

export default function CommentLists({ commentsState }) {
  return (
    <>
      {commentsState.length === 0 ? (
        <p className="text-gray-400 px-4">아직 댓글이 없어요.</p>
      ) : (
        commentsState.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      )}
    </>
  );
}
