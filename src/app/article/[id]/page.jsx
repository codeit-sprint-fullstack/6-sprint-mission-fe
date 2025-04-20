import React from "react";
import DetailBoard from "./_components/DetailBoard";
import CommentForm from "./_components/CommentForm";
import Comment from "./_components/Comment";

function DetailArticle() {
  return (
    <section className="max-w-[375px] m-auto mb-[319px] pt-[24px] px-[16px] xs:max-w-[744px] xs:pt-[26px] xs:px-[24px] m:max-w-[1200px]">
      <DetailBoard />
      <CommentForm />
      <Comment />
    </section>
  );
}

export default DetailArticle;
