"use client";

import Article from "@/components/ui/Article";
import Button from "@/components/ui/Button";
import Comments from "@/components/ui/comment/Comments";
import CreateComment from "@/components/ui/comment/CreateComment";
import React from "react";

export default function SpecifiedArticle() {
  const handleBackToCommentList = () => {
    console.log("back to comment list");
  };

  return (
    <div className="flex items-center justify-center font-pretendard">
      <div className="pt-[94px]">
        <Article />
        <CreateComment />
        <Comments />
        <div className="flex justify-center mt-[64px] mb-[193px]">
          <Button
            text={"목록으로 돌아가기"}
            onClick={handleBackToCommentList}
            disabled={false}
            width={"w-[240px]"}
            height={"h-[48px]"}
            rounded={"rounded-[40px]"}
          />
        </div>
      </div>
    </div>
  );
}
