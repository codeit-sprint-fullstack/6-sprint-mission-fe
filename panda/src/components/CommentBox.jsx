import React from "react";
import AuthorInfo from "./AuthorInfo";
import UDDropdownMenu from "./UDDropdownMenu";

function CommentBox({ comment }) {
  return (
    <section>
      <div className="flex justify-between">
        <p className="mb-[24px] text-[14px] text-gray-800">{comment.content}</p>
        <UDDropdownMenu />
      </div>

      <AuthorInfo
        nickname={comment.writer.nickname}
        createdAt={comment.createdAt}
      />
      <hr className="text-gray-300 mt-1" />
    </section>
  );
}

export default CommentBox;
