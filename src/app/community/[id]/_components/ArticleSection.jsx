"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegHeart, FaHeart, FaEllipsisV } from "react-icons/fa";
import { useArticle } from "@/hooks/Article";
import ConfirmModal from "@/components/common/ConfirmModal";
import { articlesService } from "@/api/articles";

export default function ArticleSection({ article, onArticleUpdate }) {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(article.data?.title || "");
  const [editContent, setEditContent] = useState(article.data?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [likes, setLikes] = useState(article.data?.likes);
  const [isLiked, setIsLiked] = useState(article.data?.isLiked);

  const { updateArticle, deleteArticle, refetch } = useArticle(
    article.data?.id,
  );

  // editTitle과 editContent를 article이 변경될 때마다 업데이트
  useEffect(() => {
    setEditTitle(article.data?.title || "");
    setEditContent(article.data?.content || "");
  }, [article]);

  // 게시글 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(article.data?.title || "");
    setEditContent(article.data?.content || "");
  };

  // 게시글 수정 저장
  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const updatedArticle = await updateArticle({
        title: editTitle,
        content: editContent,
      });

      setIsEditing(false);
      setShowOptions(false);

      // 로컬 상태 업데이트
      setEditTitle(updatedArticle?.data?.title || editTitle);
      setEditContent(updatedArticle?.data?.content || editContent);

      // 수정 후 서버에서 최신 데이터 다시 가져오기
      await refetch();

      // 부모 컴포넌트에 게시글이 업데이트되었음을 알림
      if (onArticleUpdate) {
        onArticleUpdate();
      }
    } catch (err) {
      console.error("게시글 수정 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 게시글 삭제 모달 열기
  const openDeleteModal = () => {
    setShowOptions(false);
    setShowDeleteModal(true);
  };

  // 게시글 삭제 실행
  const executeDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteArticle();
      router.push("/community"); // 목록 페이지로 이동
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 좋아요 토글
  // TODO : 리액트 쿼리의 옵티마이제이션 고려해보기

  const handleToggleLike = async () => {
    if (isLiked) {
      await articlesService.deleteLiked(article.data?.id);
      setLikes(likes - 1);
    } else {
      await articlesService.createLiked(article.data?.id);
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div>
        {/* TOOD : 추후 낙관적 업데이트 적용해보기 현재는 refetch 후 렌더링 되는 방식으로 UX 좋지 않음 */}
        {isEditing ? (
          <div className="mb-6">
            {/* 게시글 수정 폼 */}
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="mb-4 w-full rounded-lg border border-none bg-gray-100 p-3 text-lg font-bold focus:border-blue-500 focus:outline-none"
              placeholder="제목을 입력하세요"
              disabled={isSubmitting}
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="h-64 w-full resize-none rounded-lg bg-gray-100 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="내용을 입력하세요"
              disabled={isSubmitting}
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="cursor-pointer rounded-md border border-none bg-white px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                onClick={handleSaveEdit}
                className="cursor-pointer rounded-md bg-[#3692FF] px-10 py-2 text-sm font-medium text-white transition hover:bg-blue-400 disabled:opacity-50"
                disabled={
                  !editTitle.trim() || !editContent.trim() || isSubmitting
                }
              >
                {isSubmitting ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex w-full justify-between border-b border-[#e5e7eb] pb-4">
              {/* 타이틀, 작성자 정보 */}
              <div className="flex min-w-[95%] flex-col gap-4">
                {/* 타이틀 */}
                <div className="max-w-[90%] text-[20px] font-bold text-[#1f2937]">
                  {article.data?.title}
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
                        판다판다
                      </span>
                      <span className="text-[14px] font-medium text-[#9ca3af]">
                        {article.data?.createdAt
                          ? new Date(
                              article.data.createdAt,
                            ).toLocaleDateString()
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
                        setIsEditing(true);
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
            </div>

            {/* 이미지 영역 추가 */}
            {article.data?.image && article.data.image.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-4">
                {article.data.image.map((imageUrl, index) => (
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
              {article.data?.content || "게시글 조회에 실패하였습니다."}
            </div>
          </div>
        )}
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
    </>
  );
}
