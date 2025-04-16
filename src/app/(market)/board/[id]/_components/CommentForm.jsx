import React from "react";
import CommentList from "./CommentList";

function CommentForm() {
  return (
    <>
      <form className="mb-10">
        <h3 className="font-semibold">댓글 달기</h3>
        <textarea
          className="w-full mt-[9px] mb-4 rounded-xl bg-gray-100 px-6 py-4 resize-none"
          placeholder="댓글을 입력해주세요."
        />
        <div className="flex justify-end">
          <button className="btn-base" type="submit">
            등록
          </button>
        </div>
      </form>
      <CommentList />
    </>
  );
}

export default CommentForm;
