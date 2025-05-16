"use client";

import React, { useState } from "react";
import DropDownToggle from "@/components/ui/DropDownToggle";
import { useParams, useRouter } from "next/navigation";
import Profile from "@/components/ui/Profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/service/postService";
import { useAuth } from "@/providers/AuthProvider";

export default function ArticleDetail() {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const { articleId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // 게시글 상세 조회
  const {
    data: article,
    isPending,
    error,
  } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => postService.getPost("articles", articleId),
  });

  // 게시글 삭제 API
  const { mutate: deleteArticle } = useMutation({
    mutationFn: (articleId) => postService.deletePost("articles", articleId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["articles", articleId] }),
  });

  // 게시글 삭제
  const handleDelete = () => {
    deleteArticle(articleId);

    router.push("/community");
  };

  // 게시글 수정(페이지 이동)
  const handleEdit = () => {
    router.push(`/community/${articleId}/edit`);
  };

  // 정렬 선택버튼 토글
  const handleDropDownToggle = () => {
    setIsDropDownVisible(!isDropDownVisible);
  };

  // 정렬 선택버튼 닫기
  const handleDropDownClose = () => {
    setIsDropDownVisible(false);
  };

  if (isPending || !article) {
    return (
      <div className="flex justify-center items-center gap-[8px]">
        <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-200 border-t-primary-100 rounded-full animate-spin"></div>
        <p className="font-medium">불러오는 중</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">{error.message}</div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-[16px] w-full">
        <div className="relative flex justify-between gap-[8px]">
          <h2 className="font-bold text-[20px]/[32px]">{article.title}</h2>
          {/* TODO: 작성자만 드롭다운 버튼 볼수 있도록 하기 */}
          {user?.id === article.ownerId && (
            <DropDownToggle
              page="article"
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDropDownToggle={handleDropDownToggle}
              handleDropDownClose={handleDropDownClose}
              isDropDownVisible={isDropDownVisible}
            />
          )}
        </div>
        <Profile article={article} />
        <div className="border-t-[1.3px] border-secondary-gray-200"></div>
      </div>
      <p className="whitespace-pre-line w-full font-normal text-[16px]/[26px] mt-[16px] mb-[32px] sm:mt-[24px] sm:mb-[40px]">
        {article.content}
      </p>
    </>
  );
}
