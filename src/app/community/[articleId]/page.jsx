import React from "react";
import ArticleDetail from "./_components/ArticleDetail";
import Comments from "./_components/Comments/Comments";

export default function CommunityDetailPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full max-w-[1200px] p-[16px] sm:p-[24px]">
        <ArticleDetail />
        <Comments />
      </div>
    </div>
  );
}
