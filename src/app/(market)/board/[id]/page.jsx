"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CommentForm from "./_components/CommentForm";
import { deleteArticle, getArticle } from "@/lib/api/articleApi";
import { useParams, useRouter } from "next/navigation";
import FormatDate from "@/components/ui/FormatDate";
import Dropdown from "@/components/ui/Dropdown";
import { getComments } from "@/lib/api/commentApi";
import CommentList from "./_components/CommentList";

export function UserLocation() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  return <div>현재 URL: {location}</div>;
}

function page() {
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
    <div className="flex-col px-4 pt-6">
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
        <div className="flex items-center my-4 gap-4">
          <Image
            src="/assets/icon/ic_profile.svg"
            alt="기본 프로필 아이콘"
            width={40}
            height={40}
          />
          <div className="flex gap-0.5 md:gap-2">
            <div className="font-medium text-gray-600">총명한 판다</div>
            <FormatDate createdAt={article.createdAt} />
          </div>
          <span className="h-10 border-r-1 border-gray-200 md:mx-4"></span>
          <button className="flex items-center px-3 py-1 border-1 border-gray-200 rounded-[35px] gap-1">
            <Image
              src="/assets/icon/ic_unheart.svg"
              alt="좋아요 아이콘"
              width={24}
              height={24}
              className="md:w-8 md:h-8"
            />
            <span className="font-medium text-gray-500">123</span>
          </button>
        </div>
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
        <Link href="/board" className="flex justify-center">
          <button className="flex btn-base h-12 mt-10 mb-[234px] px-10 rounded-[40px] gap-2">
            <span className="text-lg font-semibold">목록으로 돌아가기</span>
            <Image
              src="/assets/icon/ic_back.svg"
              alt="되돌아가기 아이콘"
              width={24}
              height={24}
            />
          </button>
        </Link>
      </section>
    </div>
  );
}

export default page;
