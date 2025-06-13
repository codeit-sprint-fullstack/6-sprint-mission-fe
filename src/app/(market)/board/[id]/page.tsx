"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import UserInfo from "@/components/ui/UserInfo";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CommentSection from "../../_components/CommentSection";
import { EDIT_OPTIONS } from "@/const";
import { getArticle } from "@/lib/getApi";
import { deleteArticle } from "@/lib/actions/article";

function ArticlePage() {
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getArticleById()]);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  // 상세 게시글 불러오는 함수
  const getArticleById = async () => {
    const data = await getArticle(id);
    setArticle(data);
    console.log(article);
  };

  if (isLoading) return null;

  // 게시글 편집 핸들러
  const handleEditArticle = (action) => {
    setIsDropdownOpen(true);
    if (action === "edit") {
      router.push(`/board/${id}/edit`);
    } else if (action === "delete") {
      handleDeleteArticle();
      router.push("/board");
    }
  };

  // 게시글 삭제 핸들러
  const handleDeleteArticle = async () => {
    await deleteArticle(id);
  };

  return (
    <div className="flex-col">
      <nav className="w-full border-b-1 border-gray-200">
        <div className="flex justify-between gap-2">
          <h2 className="text-xl font-bold text-gray-800">{article.title}</h2>
          <div>
            <Image
              src="/assets/icon/ic_kebab.svg"
              alt="편집 아이콘"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />
            {isDropdownOpen && (
              <Dropdown items={EDIT_OPTIONS} onSelect={handleEditArticle} />
            )}
          </div>
        </div>
        <UserInfo
          nickname={article.writer.nickname}
          createdAt={article.createdAt}
          favoriteCount={article.likeCount}
        />
      </nav>
      <section>
        <p className="mt-4 mb-8">{article.content}</p>
        <CommentSection id={id} type="article" />
        <GoBackBtn />
      </section>
    </div>
  );
}

export default ArticlePage;
