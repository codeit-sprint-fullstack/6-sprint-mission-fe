"use client";

import React, { useEffect, useState } from "react";
import DropDownToggle from "@/components/ui/DropDownToggle";
import { deleteArticle, getArticle } from "@/service/articleService";
import { useParams, useRouter } from "next/navigation";
import Profile from "@/components/ui/Profile";

export default function ArticleDetail() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const { articleId } = useParams();
  const router = useRouter();

  // 게시글 상세 조회
  const articleLoad = async (articleId) => {
    const article = await getArticle(articleId);

    setArticle(article);
    setIsLoading(false);
  };

  useEffect(() => {
    articleLoad(articleId);
  }, []);

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  // 정렬 선택버튼 닫기
  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  // 게시글 수정
  const handleEdit = () => {
    router.push(`/community/${articleId}/edit`);
  };

  // 게시글 삭제
  const removeArticle = async (articleId) => {
    await deleteArticle(articleId);

    router.push("/community");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center gap-[8px]">
          <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
          <p className="font-medium">불러오는 중</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-[16px] w-full">
            <div className="relative flex justify-between gap-[8px]">
              <h2 className="font-bold text-[20px]/[32px]">{article.title}</h2>
              {/* TODO: 작성자만 드롭다운 버튼 볼수 있도록 하기 */}
              <DropDownToggle
                page="article"
                handleEdit={handleEdit}
                handleDelete={() => removeArticle(articleId)}
                handleDropDownToggle={handleDropDownToggle}
                handleDropDownClose={handleDropDownClose}
                isDropDownVisible={isDropDownVisible}
              />
            </div>
            <Profile article={article} />
            <div className="border-t-[1.3px] border-secondary-gray-200"></div>
          </div>
          <p className="whitespace-pre-line w-full font-normal text-[16px]/[26px] mt-[16px] mb-[32px] sm:mt-[24px] sm:mb-[40px]">
            {article.content}
          </p>
        </>
      )}
    </>
  );
}
