"use client";

import { getArticles } from "@/lib/api/article.api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ic_heart from "@/assets/images/common/ic_heart.svg";
import img_notebook from "@/assets/images/community/img_notebook.svg";
import ic_profile from "@/assets/images/common/ic_profile.svg";
import Link from "next/link";

export default function ArticleList() {
  const articles = [
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
  // const [params, setParams] = useState({
  //   page: 1,
  //   limit: 5,
  //   orderBy: "recent",
  //   keyword: "",
  // });

  /* 반응형 리퀘스트 추가 */

  // useEffect(() => {
  //   articlesLoad(params);
  // }, [params]);

  // const articlesLoad = async (params) => {
  //   const articles = await getArticles(params);
  //   setArticles(articles);
  //   setIsLoading(false);
  // };

  return (
    <div className="flex flex-col gap-[24px]">
      {/* {isLoading ? "게시글 로딩중..." : }*/}
      {articles.map((article) => (
        <AriclesLoad key={article.id} article={article} />
      ))}
    </div>
  );
}

function AriclesLoad({ article }) {
  return (
    <>
      <Link
        href={`/community/${article.id}`}
        className="flex flex-col gap-y-[16px]"
      >
        <div className="flex justify-between gap-[8px]">
          <p className="font-semibold text-[18px]/[26px] w-full h-[48px] sm:text-[20px]">
            {article.title}
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
            <div className="relative w-[24px] h-[24px]">
              <Image
                src={ic_profile}
                alt="프로필"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-secondary-gray-500">총명한 판다</p>
            <p className="text-secondary-gray-300">{article.createdAt}</p>
          </div>
          <div className="flex justify-center items-center gap-[8px]">
            <div className="relative w-[24px] h-[24px]">
              <Image src={ic_heart} alt="하트" fill className="object-cover" />
            </div>
            <p className="text-secondary-gray-400 text-[16px]">9999+</p>
          </div>
        </div>
      </Link>
      <div className="border-t-[1.3px] border-secondary-gray-200"></div>
    </>
  );
}
