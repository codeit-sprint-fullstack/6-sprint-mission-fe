"use client";

import { getArticles } from "@/lib/api/article.api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ic_heart from "@/assets/images/common/ic_heart.svg";
import img_badge from "@/assets/images/community/img_badge.svg";
import img_notebook from "@/assets/images/community/img_notebook.svg";
import Link from "next/link";
import { useGetDeviceType } from "@/hooks/useGetDeviceType";

export default function BestArticleList() {
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    orderBy: "recent",
    keyword: "",
  });

  const bestArticles = [
    {
      id: "1",
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야 하나요?",
      createdAt: "2025. 04. 16",
    },
    {
      id: "2",
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야 하나요?",
      createdAt: "2025. 04. 16",
    },
    {
      id: "3",
      title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야 하나요?",
      createdAt: "2025. 04. 16",
    },
  ];

  // const [articles, setArticles] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // 반응형 리퀘스트 보내기
  useGetDeviceType(setParams);

  // useEffect(() => {
  //   articlesLoad(params);
  // }, [params]);

  // const articlesLoad = async (params) => {
  //   const articles = await getArticles(params);
  //   setArticles(articles);
  //   setIsLoading(false);
  // };

  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-bold text-[20px]">베스트 게시글</h2>
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 md:grid-cols-3 md:gap-[24px]">
        {/* {isLoading ? "게시글 로딩중..." : }*/}
        {bestArticles.map((bestArticle) => (
          <BestAriclesLoad key={bestArticle.id} bestArticle={bestArticle} />
        ))}
      </div>
    </div>
  );
}

function BestAriclesLoad({ bestArticle }) {
  return (
    <Link
      href={`/community/${bestArticle.id}`}
      className="rounded-[8px] bg-secondary-gray-50"
    >
      <div className="relative w-[102px] h-[30px] ml-[24px]">
        <Image src={img_badge} alt="뱃지" fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-[40px] py-[16px] px-[24px] md:gap-[18px] md:pb-[9px]">
        <div className="flex justify-between gap-[40px] md:gap-[8px]">
          <p className="font-semibold text-[18px]/[26px] w-full h-[48px] md:text-[20px]/[32px]">
            {bestArticle.title}
          </p>
          <div className="flex justify-center items-center min-w-[72px] h-[72px] bg-white border-[1px] rounded-[8px] border-secondary-gray-200">
            <div className="relative w-[48px] h-[44.57px]">
              <Image
                src={img_notebook}
                alt="게시글 이미지"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center font-normal text-[14px]/[24px]">
          <div className="flex gap-[8px]">
            <p className="text-secondary-gray-500">총명한 판다</p>
            <div className="flex justify-center items-center gap-[4px]">
              <div className="relative w-[16px] h-[16px]">
                <Image
                  src={ic_heart}
                  alt="하트"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-secondary-gray-400">9999+</p>
            </div>
          </div>
          <p className="text-secondary-gray-300">{bestArticle.createdAt}</p>
        </div>
      </div>
    </Link>
  );
}
