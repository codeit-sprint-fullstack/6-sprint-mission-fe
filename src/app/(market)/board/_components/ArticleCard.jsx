import FormatDate from "@/components/ui/FormatDate";
import Image from "next/image";
import React from "react";

function ArticleCard({ title, createdAt }) {
  return (
    <>
      <div className="flex justify-between items-center gap-10 mb-10">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex justify-center items-center w-18 h-18 bg-white border-1 border-gray-200 rounded-lg">
          <Image
            src="/assets/img/img_default.svg"
            alt="게시글 기본 이미지"
            width={48}
            height={48}
          />
        </div>
      </div>
      <div className="flex justify-between text-sm font-normal">
        <div className="flex gap-2">
          <div className="text-gray-600">총명한 판다</div>
          <FormatDate createdAt={createdAt} />
        </div>
        <div className="flex gap-1">
          <img src="/assets/icon/ic_unheart.svg" alt="좋아요 아이콘" />
          <div className="text-gray-500">9999+</div>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
