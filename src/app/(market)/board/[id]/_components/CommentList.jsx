import React from "react";
import CommentItem from "./CommentItem";
import Image from "next/image";

function CommentList({
  articleId,
  comments,
  setComments,
  editOption,
  getCommentList,
}) {
  if (!comments || comments.length === 0) {
    return (
      <div className="flex flex-col items-center text-center text-gray-400">
        <Image
          src="/assets/img/img_reply_empty.svg"
          alt="댓글 없음 이미지"
          width={140}
          height={140}
        />
        <p>
          아직 댓글이 없어요,
          <br />
          지금 댓글을 달아보세요!
        </p>
      </div>
    );
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem
            articleId={articleId}
            comment={comment}
            setComments={setComments}
            editOption={editOption}
            getCommentList={getCommentList}
          />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
