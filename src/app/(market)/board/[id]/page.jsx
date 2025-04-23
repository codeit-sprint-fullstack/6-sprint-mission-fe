"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { deleteArticle, getArticle } from "@/lib/articleApi";
import { useParams, useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import { getComments } from "@/lib/commentApi";
import CommentForm from "../../_components/CommentForm";
import CommentList from "../../_components/CommentList";
import UserInfo from "@/components/ui/UserInfo";
import GoBackBtn from "@/components/ui/GoBackBtn";

export function UserLocation() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  return <div>현재 URL: {location}</div>;
}

function ArticlePage() {
  const [article, setArticle] = useState();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const editOption = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getArticleById(), getCommentList()]);
      setIsLoading(false);
    };

    fetchData();
  }, [params.id]);

  // 상세 게시글 불러오는 함수
  const getArticleById = async () => {
    const data = await getArticle(params.id);
    setArticle(data);
  };

  // 게시글 댓글 목록 불러오는 함수
  const getCommentList = async () => {
    const data = await getComments(params.id);
    setComments(data);
  };

  if (isLoading) return null;

  // 게시글 편집 핸들러
  const handleEditArticle = (action) => {
    setIsDropdownOpen(true);
    if (action === "edit") {
      router.push(`/board/${params.id}/edit`);
    } else if (action === "delete") {
      handleDeleteArticle();
      router.push("/board");
    }
  };

  // 게시글 삭제 핸들러
  const handleDeleteArticle = async () => {
    await deleteArticle(params.id);
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
              <Dropdown items={editOption} onSelect={handleEditArticle} />
            )}
          </div>
        </div>
        <UserInfo article={article} />
      </nav>
      <section>
        <p className="mt-4 mb-8">{article.content}</p>
        <CommentForm articleId={params.id} getCommentList={getCommentList} />
        <CommentList
          articleId={params.id}
          comments={comments}
          setComments={setComments}
          editOption={editOption}
          getCommentList={getCommentList}
        />
        <GoBackBtn />
      </section>
    </div>
  );
}

export default ArticlePage;
