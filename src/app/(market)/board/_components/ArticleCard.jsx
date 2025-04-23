import FormatDate from "@/components/ui/FormatDate";
import React from "react";

function ArticleCard({ title, createdAt, isBest }) {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className={`text-lg font-semibold ${isBest ? "mr-10" : "mr-2"}`}>
          {title}
        </h2>
        <div className="w-[72px] h-[72px] p-3 bg-white border border-gray-200 rounded-lg">
          <img
            src="/assets/img/img_default.svg"
            alt="게시글 기본 이미지"
            className="w-[48px] h-[48px]"
          />
        </div>
      </div>
      {isBest ? (
        <div className="flex justify-between text-sm font-normal">
          <div className="flex gap-2">
            <div className="text-gray-600">총명한 판다</div>
            <div className="flex gap-1">
              <img src="/assets/icon/ic_unheart.svg" alt="좋아요 아이콘" />
              <div className="text-gray-500">9999+</div>
            </div>
          </div>
          <FormatDate createdAt={createdAt} />
        </div>
      ) : (
        <div className="flex justify-between font-normal">
          <div className="flex gap-2 text-sm">
            <div className="text-gray-600">총명한 판다</div>
            <FormatDate createdAt={createdAt} />
          </div>
          <div className="flex gap-1">
            <img
              src="/assets/icon/ic_unheart.svg"
              alt="좋아요 아이콘"
              className="w-6 h-6"
            />
            <div className="text-gray-500">9999+</div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticleCard;
