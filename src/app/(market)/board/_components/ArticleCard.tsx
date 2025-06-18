import UnheartIcon from "@/assets/svgs/ic_unheart.svg";
import FormatDate from "@/components/ui/FormatDate";
import { Article } from "@/types";
import React from "react";

interface ArticleCardProps {
  article: Article;
  isBest?: boolean;
}

function ArticleCard({ article, isBest }: ArticleCardProps) {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <h2 className={`text-lg font-semibold ${isBest ? "mr-10" : "mr-2"}`}>{article.title}</h2>
        <div className="h-[72px] w-[72px] overflow-hidden rounded-lg border border-gray-200 bg-white">
          <img
            src={article.images[0]}
            alt="게시글 이미지"
            className="h-full w-full text-sm break-keep"
          />
        </div>
      </div>
      {isBest ? (
        <div className="flex justify-between text-sm font-normal">
          <div className="flex gap-2">
            <div className="text-gray-600">{article.writer.nickname}</div>
            <div className="flex items-center gap-1">
              <UnheartIcon alt="좋아요 아이콘" className="h-4 w-4" />
              <div className="text-gray-500">{article.likeCount}</div>
            </div>
          </div>
          <FormatDate createdAt={article.createdAt} />
        </div>
      ) : (
        <div className="flex justify-between font-normal">
          <div className="flex gap-2 text-sm">
            <div className="text-gray-600">{article.writer.nickname}</div>
            <FormatDate createdAt={article.createdAt} />
          </div>
          <div className="flex items-center gap-1">
            <UnheartIcon alt="좋아요 아이콘" className="h-6 w-6" />
            <span className="text-base">{article.likeCount}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleCard;
