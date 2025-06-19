"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import AuthRequiredModal from "@/components/modal/AuthRequiredModal";

export default function CommentForm({
  addComment,
}: {
  addComment: (content: string) => Promise<void>;
}) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim() || isSubmitting) return;

    // 로그인 체크
    if (!user) {
      setContent("");
      setShowAuthModal(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await addComment(content);
      setContent("");
    } catch (err) {
      console.error("댓글 작성 실패:", err);
      setError("댓글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-4 text-xl font-bold">댓글</h2>
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="mb-2 rounded-lg bg-gray-100 p-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 입력해주세요."
              className="h-24 w-full resize-none bg-transparent p-2 focus:outline-none"
              disabled={isSubmitting}
            />
          </div>
          {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`rounded-md px-6 py-2 text-sm font-medium text-white transition-colors ${
                content.trim() && !isSubmitting
                  ? "cursor-pointer bg-[#3692FF] hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-400"
              }`}
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>

      {/* 로그인 필요 모달 */}
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="로그인이 필요해요"
        message="댓글을 작성하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠어요?"
      />
    </>
  );
}
