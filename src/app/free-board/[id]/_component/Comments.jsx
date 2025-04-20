"use client";

import { useEffect, useState } from "react";
import { getComments } from "@/lib/api";
import Image from "next/image";
import { getRelativeTime } from "./DateCalculator";

export default function Comments({ articleId, boardType }) {
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  // 댓글 조회 함수
  const loadComments = async (cursor = null) => {
    setLoading(true);
    try {
      const data = await getComments(boardType, articleId, { cursor });
      setComments((prev) => [...prev, ...data.comments]);
      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error("댓글 목록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 댓글 목록 불러오기
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
              className="mb-6 border-b border-primary-300 bg-[#FCFCFC"
            >
              <div className="flex justify-between mb-6">
                <p>{comment.content}</p>
                <Image src="/ic_kebab.svg" alt="kebab" width={24} height={24} />
              </div>
              <div className="flex gap-2 items-start mb-3">
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
