"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegHeart, FaHeart, FaEllipsisV } from "react-icons/fa";
import { useArticle } from "@/hooks/Article";
import ConfirmModal from "@/components/modal/ConfirmModal";
import AuthRequiredModal from "@/components/modal/AuthRequiredModal";
import { articlesService } from "@/api/articles";
import { useAuth } from "@/providers/AuthProvider";
import { Article } from "@/types/article";

export default function ArticleSection({ article }: { article: Article }) {
  const router = useRouter();
  const { user } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [likes, setLikes] = useState(article?.likes || 0);
  const [isLiked, setIsLiked] = useState(article?.isLiked);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { deleteArticle } = useArticle(article?.id);

  // 게시글 삭제 모달 열기
  const openDeleteModal = () => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };

  // 게시글 삭제 실행
  const executeDelete = async () => {
    try {
      await deleteArticle();
      router.push("/community"); // 목록 페이지로 이동
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
    } finally {
    }
  };

  // 좋아요 토글
  const handleToggleLike = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      if (isLiked) {
        await articlesService.deleteLiked(article?.id);
        setLikes(likes - 1);
      } else {
        await articlesService.createLiked(article?.id);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.log("error", error);
      alert("좋아요 토글 실패" + error);
    }
  };

  return (
    <>
      <div>
        <div>
          <div className="mb-6 flex w-full justify-between border-b border-[#e5e7eb] pb-4">
            {/* 타이틀, 작성자 정보 */}
            <div className="flex min-w-[95%] flex-col gap-4">
              {/* 타이틀 */}
              <div className="max-w-[90%] text-[20px] font-bold text-[#1f2937]">
                {article?.title}
              </div>

              {/* 작성자 정보 */}
              <div className="flex items-center">
                {/* 프로필, 이름, 날짜 */}
                <div className="flex items-center border-r border-[#e5e7eb] pr-8">
                  <figure className="relative h-[40px] w-[40px]">
                    <Image
                      src="/img/user_icon.png"
                      alt="프로필"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </figure>
                  <div className="ml-4">
                    <span className="mr-1 text-[14px] font-medium text-gray-600">
                      {article?.author?.nickname || "판다판다"}
                    </span>
                    <span className="text-[14px] font-medium text-[#9ca3af]">
                      {article?.createdAt
                        ? new Date(article?.createdAt).toLocaleDateString()
                        : "2024. 01. 02"}
                    </span>
                  </div>
                </div>

                {/* 좋아요 */}
                <div className="flex items-center pl-8">
                  <div className="flex items-center rounded-full border-2 border-[#e5e7eb]">
                    <button
                      onClick={handleToggleLike}
                      className="flex cursor-pointer items-center px-3 py-1 text-[28px] text-gray-500 hover:text-red-500"
                    >
                      {isLiked ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                      <span className="ml-1 text-[16px] font-medium text-gray-500">
                        {likes || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 3단 메뉴 버튼 */}
            {article?.userId === user?.user.id && (
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="cursor-pointer text-[#9ca3af]"
                >
                  <FaEllipsisV />
                </button>
                {showOptions && (
                  <div className="absolute right-0 z-10 w-[100px] rounded-md border-2 border-[#e5e7eb] bg-white py-1 md:w-[140px]">
                    <button
                      onClick={() => {
                        router.push(`/community/${article?.id}/edit`);
                        setShowOptions(false);
                      }}
                      className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-blue-500"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={openDeleteModal}
                      className="flex w-full cursor-pointer items-center justify-center px-4 py-2 text-left text-sm text-[#6b7280] transition-colors hover:text-red-500"
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 이미지 영역 추가 */}
          {article?.images && article?.images.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-4">
              {article?.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative h-[300px] w-[300px] overflow-hidden rounded-lg border border-gray-200"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                    alt={`게시글 이미지 ${index + 1}`}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mb-8 text-[16px] whitespace-pre-wrap">
            {article?.content || "게시글 조회에 실패하였습니다."}
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={executeDelete}
        title="게시글 삭제"
        message="정말로 이 게시글을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
      />

      {/* 로그인 필요 모달 */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="로그인이 필요해요"
        message="좋아요 기능을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠어요?"
      />
    </>
  );
}
