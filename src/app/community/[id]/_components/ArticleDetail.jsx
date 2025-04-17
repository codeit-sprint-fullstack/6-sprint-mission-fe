"use client";

import React, { useEffect, useState } from "react";
import ic_profile from "@/assets/images/common/ic_profile.svg";
import ic_heart from "@/assets/images/common/ic_heart.svg";
import Image from "next/image";
import DropDownToggle from "@/components/ui/DropDownToggle";
import { getArticle } from "@/lib/api/article.api";
import { useParams } from "next/navigation";

export default function ArticleDetail() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [article, setArticle] = useState(null);
  const articleId = useParams();
  console.log("articleId:", articleId);

  const articleLoad = async () => {
    const article = await getArticle(articleId);
    console.log("article:", article);

    return setArticle(article);
  };

  useEffect(() => {
    articleLoad(articleId);
  }, []);

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  return (
    <>
      <div className="flex flex-col gap-[16px] w-full">
        <div className="relative flex justify-between gap-[8px]">
          <h2 className="font-bold text-[20px]/[32px]">{article.title}</h2>
          <DropDownToggle
            article={article}
            handleDropDownToggle={handleDropDownToggle}
            handleDropDownClose={handleDropDownClose}
            isDropDownVisible={isDropDownVisible}
          />
        </div>
        <div className="flex justify-start items-center gap-[16px]">
          <div className="flex justify-center items-center">
            <div className="relative w-[40px] h-[40px]">
              <Image
                src={ic_profile}
                alt="프로필"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-[14px] font-medium text-secondary-gray-500 mr-[8px] ml-[16px]">
              총명한 판다
            </p>
            <p className="text-[14px] font-normal text-secondary-gray-300">
              {article.createdAt}
            </p>
          </div>
          <div className="flex gap-[16px]">
            <div className="border-l-[1px] border-secondary-gray-200"></div>
            <div className="flex justify-center items-center rounded-[35px] border-[1.3px] border-secondary-gray-200 py-[4px] px-[12px] gap-[4px]">
              <div className="relative w-[24px] h-[24px]">
                <Image
                  src={ic_heart}
                  alt="하트"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-medium text-[16px] text-secondary-gray-400">
                123
              </p>
            </div>
          </div>
        </div>
        <div className="border-t-[1.3px] border-secondary-gray-200"></div>
      </div>

      <p className="w-full font-normal text-[16px]/[26px] mt-[16px] mb-[32px] sm:mt-[24px] sm:mb-[40px]">
        {article.content}
      </p>
    </>
  );
}
