"use client";

import { useArticle } from "@/app/context/article.context";
import Images from "@/components/ui/Images";
import React from "react";

const Comment = () => {
  const articleContext = useArticle();

  console.log(articleContext.board.comments);
  return (
    <div className="flex flex-col gap-[24px] bg-white">
      {articleContext.board?.comments?.map((comment) => (
        <div
          className="flex flex-col gap-[24px] pb-[8px] border-b border-[#E5E7EB] bg-[#FCFCFC]"
          key={comment.id}
        >
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-[#1F2937]">{comment.content}</p>
            <Images
              src={"/kebab.png"}
              w={"w-[24px]"}
              h={"h-[24px]"}
              alt={"kebab"}
            />
          </div>
          <div className="flex items-center gap-[8px]">
            <Images
              src={"/profile.png"}
              w={"w-[32px]"}
              h={"h-[32px]"}
              alt={"heart"}
            />
            <div>
              <p className="text-[12px] text-[#4B5563]">똑똑한 판다</p>
              <p className="text-[12px] text-[#9CA3AF]">1시간 전</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
