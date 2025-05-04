"use client";

import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "@/api/axiosInstance";
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

/* 상대 시간으로 변환하는 함수 */
function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}년 전`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}달 전`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}일 전`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}시간 전`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}분 전`;

  return "방금 전";
}

export default function CommentList({ comments, setComments }) {
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [commentUsers, setCommentUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const commentsWithoutWriter = comments.filter(
        (c) => !c.writer && c.userId
      );

      if (commentsWithoutWriter.length === 0) return;
      if (!accessToken) return;

      setIsLoading(true);

      try {
        const userIds = [
          ...new Set(commentsWithoutWriter.map((c) => c.userId)),
        ];

        if (userIds.length === 0) {
          setIsLoading(false);
          return;
        }

        // 각 사용자 정보 가져오기
        const userData = { ...commentUsers };

        for (const userId of userIds) {
          if (userData[userId]) continue;

          try {
            const response = await axiosInstance.get(
              `/users/profile/${userId}`
            );

            if (response.data) {
              userData[userId] = response.data;
            }
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
          }
        }

        setCommentUsers(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [comments, accessToken, commentUsers]);

  /* 삭제 */
  const handleDelete = async (id) => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    await axiosInstance.delete(`/comments/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setComments((cs) => cs.filter((c) => c.id !== id));
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditedContent(c.content);
    setDropdownOpenId(null);
  };

  /* 수정 저장 */
  const saveEdit = async (id) => {
    const trimmed = editedContent.trim();
    if (!trimmed) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    await axiosInstance.patch(
      `/comments/${id}`,
      { content: trimmed },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    setComments((cs) =>
      cs.map((c) => (c.id === id ? { ...c, content: trimmed } : c))
    );
    setEditingId(null);
    setEditedContent("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedContent("");
  };

  const getUserNickname = (comment) => {
    if (comment.writer?.nickname) return comment.writer.nickname;
    if (comment.userId && commentUsers[comment.userId]?.nickname) {
      return commentUsers[comment.userId].nickname;
    }

    return "익명팬더";
  };

  return (
    <ul className="space-y-6">
      {comments.map((c, idx) => (
        <li key={c.id ?? `tmp-${idx}`} className="relative">
          {editingId !== c.id && (
            <div className="absolute top-2 right-2">
              <button
                onClick={() =>
                  setDropdownOpenId((prev) => (prev === c.id ? null : c.id))
                }
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <BsThreeDotsVertical className="text-gray-400 w-5 h-5" />
              </button>

              {dropdownOpenId === c.id && (
                <ul className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow text-sm z-10">
                  <li
                    onClick={() => startEdit(c)}
                    className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
                  >
                    수정하기
                  </li>
                  <li
                    onClick={() => handleDelete(c.id)}
                    className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
                  >
                    삭제하기
                  </li>
                </ul>
              )}
            </div>
          )}

          {editingId === c.id ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="내용을 수정하세요"
              rows={4}
              className="w-full bg-gray-100 rounded-lg p-4 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="bg-gray-50 p-4 rounded-lg text-sm font-medium text-gray-800 whitespace-pre-wrap">
              {c.content}
            </p>
          )}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-3">
                <Image
                  src={
                    c.writer?.profileImage ||
                    commentUsers[c.userId]?.profileImage ||
                    "/images/products/userProfile.png"
                  }
                  fill
                  alt="프로필"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  {getUserNickname(c)}
                </span>
                <span className="text-xs text-gray-400">
                  {timeSince(c.createdAt)}
                </span>
              </div>
            </div>

            {editingId === c.id && (
              <div className="flex gap-3">
                <button
                  onClick={cancelEdit}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  취소
                </button>
                <button
                  onClick={() => saveEdit(c.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1 rounded-md"
                >
                  수정 완료
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
