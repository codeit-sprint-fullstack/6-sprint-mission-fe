import React from "react";
import CommentList from "./_components/CommentList";
import CommentCreate from "./_components/CommentCreate";
import ArticleDetail from "./_components/ArticleDetail";

export default function CommunityDetailPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full max-w-[1200px] p-[16px] sm:p-[24px]">
        <ArticleDetail />
        <div className="flex flex-col w-full gap-[24px] sm:gap-[32px] md:gap-[40px]">
          <CommentCreate />
          <CommentList />
        </div>
      </div>
    </div>
  );
}
