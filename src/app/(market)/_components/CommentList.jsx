import React from "react";
import CommentItem from "./CommentItem";
import Image from "next/image";

function CommentList({ comments, setComments, getCommentList, type }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="flex flex-col items-center text-center text-gray-400">
        {type === "product" ? (
          <Image
            src="/assets/img/inquiry_empty.svg"
            alt="문의 없음 이미지"
            width={140}
            height={140}
            className="mb-2"
          />
        ) : (
          <Image
            src="/assets/img/reply_empty.svg"
            alt="댓글 없음 이미지"
            width={140}
            height={140}
            className="mb-4"
          />
        )}
        {type === "product" ? (
          <p>아직 문의가 없어요</p>
        ) : (
          <p>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        )}
      </div>
    );
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem
            comment={comment}
            setComments={setComments}
            getCommentList={getCommentList}
          />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
