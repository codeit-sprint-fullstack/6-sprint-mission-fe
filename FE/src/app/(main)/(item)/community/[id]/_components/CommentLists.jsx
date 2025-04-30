import CommentCard from "./CommentCard";

export default function CommentLists({ comments }) {
  return (
    <>
      {comments.length === 0 ? (
        <p className="text-gray-400 px-4">아직 댓글이 없어요.</p>
      ) : (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      )}
    </>
  );
}
