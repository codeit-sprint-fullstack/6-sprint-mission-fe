"use client";

import React from "react";
import MoreToggle from "./MoreToggle";
import { usePathname, useRouter } from "next/navigation";

function ArticleDetail({ articleId, article }) {
  const router = useRouter();

  // 날짜 prettier
  const formatDate = (iso) => {
    const date = new Date(iso);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const onPatch = () => {
    console.log("수정하러 가기");

    router.push(`/posting/${articleId}`);
  };

  const onDelete = () => {
    console.log("삭제하러 가기");
  };

  return (
    <>
      <div className="h-[104px] mt-[24px] pb-[16px] border-b border-seven">
        <div className="flex flex-row w-[1200px] justify-between">
          <div className="font-[700] text-[20px]"> {article.title} </div>
          <MoreToggle onPatch={onPatch} onDelete={onDelete} />
        </div>

        <div className="flex flex-row justify-between items-center w-[354px] h-[40px] text-[14px] mt-[16px] text-eight">
          <div className="flex flex-row  items-center gap-[8px] ">
            <img src="/image/ui/profile.png" className="w-[24px] h-[24px]" />
            <div> 총명한 판다 </div>
            <div className="font-[400] text-[14px] text-fifth">
              {formatDate(article.createdAt)}
            </div>
          </div>

          <div className="flex flex-row w-[82px] h-[26px] items-center justify-between border-b border-seven rounded-[35px]">
            <img
              src="/image/ui/likeHeart.png"
              className="w-[26.8px] h-[23.3px]"
            />
            <div className="text-[16px]"> 9999+ </div>
          </div>
        </div>
      </div>

      <div className="pt-[24px] text-[18px]">{article.content}</div>
    </>
  );
}

export default ArticleDetail;
