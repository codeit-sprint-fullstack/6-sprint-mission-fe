"use client";

import { useEffect, useState } from "react";
import { getComments } from "@/lib/api";
import Image from "next/image";
import { getRelativeTime } from "./DateCalculator";
import DropdownMenu from "./DropdownMenu";

export default function Comments({ articleId, boardType }) {
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  function removeDuplicateComments(comments) {
    const seen = new Set();
    return comments.filter((comment) => {
      if (seen.has(comment.id)) return false;
      seen.add(comment.id);
      return true;
    });
  }

  const handleSaveEdit = async (commentId) => {
    try {
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content: editedContent } : c
        )
      );
      setEditingCommentId(null);
      setEditedContent("");
    } catch (error) {
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
  };

  // 댓글 조회 함수
  const loadComments = async (cursor = null) => {
    setLoading(true);
    try {
      const data = await getComments(boardType, articleId, { cursor });
      setComments((prev) =>
        removeDuplicateComments([...prev, ...data.comments])
      );

      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [articleId, boardType]);

  return (
    <div>
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 mb-4">
          <Image
            src="/Img_reply_empty.svg"
            alt="empty"
            width={140}
            height={140}
          />
          <p className="text-[16px] font-normal text-primary-400 text-center">
            아직 댓글이 없어요.
            <br />
            지금댓글을 달아보세요!
          </p>
        </div>
      ) : (
        <div>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-6 border-b border-primary-300 bg-[#FCFCFC] p-2 rounded"
            >
              <div className="flex justify-between mb-3">
                {editingCommentId === comment.id ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                ) : (
                  <p>{comment.content}</p>
                )}
                <DropdownMenu
                  id={comment.id}
                  type="comment"
                  boardType={boardType}
                  articleId={articleId}
                  onEdit={() => handleEditComment(comment)}
                  onDeleted={() =>
                    setComments((prev) =>
                      prev.filter((c) => c.id !== comment.id)
                    )
                  }
                />
              </div>

              {editingCommentId === comment.id && (
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="text-blue-500 text-sm"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="text-gray-400 text-sm"
                  >
                    취소
                  </button>
                </div>
              )}

              <div className="flex gap-2 items-start mb-2">
                <Image
                  src="/ic_profile.svg"
                  alt="profile"
                  width={32}
                  height={32}
                />
                <div>
                  <p className="text-[12px] font-normal text-primary-600 mb-1">
                    똑똑한판다
                  </p>
                  <p className="text-[12px] text-primary-400 font-normal">
                    {getRelativeTime(comment.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {nextCursor && !loading && (
        <button
          onClick={() => loadComments(nextCursor)}
          className="text-blue-500 mt-4"
        >
          더 보기
        </button>
      )}

      {loading && <p>댓글을 불러오는 중...</p>}
    </div>
  );
}
