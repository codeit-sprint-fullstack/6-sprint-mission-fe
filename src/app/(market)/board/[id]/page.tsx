"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import UserInfo from "@/components/ui/UserInfo";
import GoBackBtn from "@/components/ui/GoBackBtn";
import CommentSection from "../../_components/CommentSection";
import { EDIT_OPTIONS } from "@/constant";
import { Article } from "@/types";
import { articleService } from "@/lib/service/articleService";
import { deleteArticleAction } from "@/lib/actions/article";
import EditIcon from "@/assets/svgs/ic_kebab.svg";

function ArticlePage() {
  const [article, setArticle] = useState<Article>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getArticleById()]);
      setIsLoading(false);
    };

    fetchData();
  }, [articleId]);

  // 상세 게시글 불러오는 함수
  const getArticleById = async () => {
    const data = await articleService.getArticle(articleId);
    setArticle(data);
  };

  console.log(article);
  if (isLoading) return null;

  // 게시글 편집 핸들러
  const handleEditArticle = (action: string) => {
    setIsDropdownOpen(true);
    if (action === "edit") {
      router.push(`/board/${articleId}/edit`);
    } else if (action === "delete") {
      handleDeleteArticle();
      router.push("/board");
    }
  };

  // 게시글 삭제 핸들러
  const handleDeleteArticle = async () => {
    await deleteArticleAction({ articleId });
  };

  return (
    <div className="flex-col">
      <nav className="w-full border-b-1 border-gray-200">
        <div className="flex justify-between gap-2">
          <h2 className="text-xl font-bold text-gray-800">{article?.title}</h2>
          <div>
            <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <EditIcon alt="편집 아이콘" />
            </button>
            {isDropdownOpen && <Dropdown items={EDIT_OPTIONS} onSelect={handleEditArticle} />}
          </div>
        </div>
        <UserInfo
          nickname={article?.writer.nickname!}
          createdAt={article?.createdAt!}
          favoriteCount={article?.likeCount!}
        />
      </nav>
      <section>
        <p className="mt-4 mb-8">{article?.content}</p>
        <CommentSection id={articleId} type="article" />
        <GoBackBtn />
      </section>
    </div>
  );
}

export default ArticlePage;
