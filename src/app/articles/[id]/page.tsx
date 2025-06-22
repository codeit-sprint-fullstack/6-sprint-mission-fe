"use client";

import React, { useEffect, useState } from "react";
import ArticleDetail from "@/components/ArticleDetail";
import CommentList from "@/components/CommentList";
import { useRouter, useParams } from "next/navigation";
import { TbArrowBack } from "react-icons/tb";
import axiosInstance from "@/api/axiosInstance";
import Image from "next/image";

const ArticlePage = (): React.JSX.Element => {
  const { id } = useParams();
  const stringId = typeof id === "string" ? id : id?.[0] ?? "";
  const router = useRouter();
  const [hasComments, setHasComments] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // 댓글 유무 확인
  useEffect(() => {
    const fetchCommentCount = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/articles/${stringId}/comments`);
        setHasComments((res.data?.data?.length || 0) > 0);
      } catch (error: any) {
        console.error(
          "댓글 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    if (stringId) fetchCommentCount();
  }, [stringId, refreshTrigger]);

  return (
    <div className="max-w-[1200px] mx-auto">
      <ArticleDetail
        onCommentSubmit={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <div className="mt-10">
        {hasComments ? (
          <>
            <h3 className="text-xl font-semibold mb-4">댓글</h3>
            <CommentList
              resourceType="articles"
              resourceId={stringId}
              refreshTrigger={refreshTrigger}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 py-16 space-y-4">
            <div className="relative w-32 h-32">
              <Image
                src="/images/products/emptyComment.png"
                alt="댓글 없음"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center text-sm text-gray-400">
              아직 댓글이 없어요, <br />
              지금 댓글을 달아보세요!
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-12 mb-10">
        <button
          onClick={() => router.push("/articles")}
          className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          목록으로 돌아가기
          <TbArrowBack className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ArticlePage; 