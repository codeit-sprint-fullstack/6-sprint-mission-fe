"use client";

import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import Image from "next/image";

function CommentsList({ comments, articleId }) {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (comments.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [comments]);
  return !isEmpty ? (
    <div className="mt-6 flex flex-col gap-4 ">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          dcontent={comment.content}
          commentId={comment.id}
          articleId={articleId}
        />
      ))}
    </div>
  ) : (
    <div className="mt-6 flex flex-col justify-center items-center">
      <Image
        alt="reply empty"
        src="/assets/img/img_reply_empty.png"
        className="h-35 w-35"
      />
      <p className="text-center text-gray-400">
        아직 댓글이 없어요,
        <br />
        지금 댓글을 달아보세요!
      </p>
    </div>
  );
}

export default CommentsList;
