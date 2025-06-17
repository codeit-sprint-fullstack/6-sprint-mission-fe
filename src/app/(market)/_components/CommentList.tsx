import React from "react";
import CommentItem from "./CommentItem";
import InqueryEmpty from "@/assets/svgs/inquiry_empty.svg";
import ReplyEmpty from "@/assets/svgs/reply_empty.svg";
import { Comment } from "@/types";
import { CommentProps } from "./Comment.types";

interface CommentListProps extends CommentProps {
  comments: Comment[];
  type?: string;
}

function CommentList({ comments, setComments, getCommentList, type }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className="flex flex-col items-center text-center text-gray-400">
        {type === "product" ? (
          <InqueryEmpty alt="문의 없음 이미지" className="mb-2" />
        ) : (
          <ReplyEmpty alt="댓글 없음 이미지" className="mb-2" />
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
