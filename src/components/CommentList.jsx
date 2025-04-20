"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function CommentList({ articleId, refreshTrigger = 0 }) {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/articles/${articleId}/comments`);
      setComments(res.data.data || []);
    } catch (error) {
      console.error(
        " 댓글 목록 불러오기 실패:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (articleId) fetchComments();
  }, [articleId, refreshTrigger]);

  const handleDelete = async (commentId) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      await fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error.response?.data || error.message);
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditedContent(comment.content);
    setDropdownOpenId(null);
  };

  const handleSaveEdit = async (commentId) => {
    try {
      await axiosInstance.patch(`/comments/${commentId}`, {
        content: editedContent,
      });
      await fetchComments();
      setEditingId(null);
      setEditedContent("");
    } catch (error) {
      console.error("댓글 수정 실패:", error.response?.data || error.message);
    }
  };

  return (
    <ul className="space-y-4">
      {comments.map((c) => (
        <li
          key={c.id}
          className="w-full border-b border-gray-200 bg-secondary-100 py-4 px-4 rounded-lg"
        >
          <div className="flex justify-between items-start">
            {editingId === c.id ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 rounded-md bg-white border resize-none"
                rows={3}
              />
            ) : (
              <p className="text-base font-semibold text-gray-800">
                {c.content}
              </p>
            )}

            <div className="relative ml-2">
              <button
                onClick={() =>
                  setDropdownOpenId((prev) => (prev === c.id ? null : c.id))
                }
                className="text-sm text-gray-500"
              >
                <BsThreeDotsVertical className="text-gray-400 h-5 w-5 cursor-pointer" />
              </button>
              {dropdownOpenId === c.id && (
                <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-300 rounded-lg z-10">
                  <ul>
                    <li
                      onClick={() => handleEdit(c)}
                      className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100 cursor-pointer"
                    >
                      수정하기
                    </li>
                    <li
                      onClick={() => handleDelete(c.id)}
                      className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100 cursor-pointer"
                    >
                      삭제하기
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4 justify-between">
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-3">
                <Image
                  src="/images/products/userProfile.png"
                  alt="작성자 프로필"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                  똑똑한판다
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>
            </div>

            {editingId === c.id && (
              <button
                onClick={() => handleSaveEdit(c.id)}
                className="bg-blue-500 text-white text-sm px-4 py-1 rounded-md"
              >
                저장
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
