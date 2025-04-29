import FormatDate from "@/components/ui/FormatDate";
import React from "react";

function ArticleCard({ article, isBest }) {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className={`text-lg font-semibold ${isBest ? "mr-10" : "mr-2"}`}>
          {article.title}
        </h2>
        <div className="w-[72px] h-[72px] overflow-hidden bg-white border border-gray-200 rounded-lg">
          <img
            src={article.image}
            alt="게시글 이미지"
            className="w-full h-full text-sm break-keep"
          />
        </div>
      </div>
      {isBest ? (
        <div className="flex justify-between text-sm font-normal">
          <div className="flex gap-2">
            <div className="text-gray-600">{article.writer.nickname}</div>
            <div className="flex gap-1">
              <img src="/assets/icon/ic_unheart.svg" alt="좋아요 아이콘" />
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
          <div className="flex gap-1">
            <img
              src="/assets/icon/ic_unheart.svg"
              alt="좋아요 아이콘"
              className="w-6 h-6"
            />
            <div className="text-gray-500">{article.likeCount}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleCard;
