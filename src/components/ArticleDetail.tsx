"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  heartCount?: number;
}

interface ArticleDetailProps {
  onCommentSubmit?: () => void;
}

export default function ArticleDetail({ onCommentSubmit }: ArticleDetailProps) {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Article | null>(null);
  const [comment, setComment] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 게시글 불러오기
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axiosInstance.get(`/articles/${id}`);
        setPost(res.data);
      } catch (error: any) {
        console.error(
          "게시글 불러오기 실패:",
          error.response?.data || error.message
        );
      }
    };

    if (id) fetchArticle();
  }, [id]);

  // 댓글 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await axiosInstance.post(`/articles/${id}/comments`, {
        content: comment,
      });
      alert("댓글이 등록되었습니다.");
      setComment("");

      if (onCommentSubmit) onCommentSubmit();
    } catch (error: any) {
      console.error("댓글 등록 실패:", error.response?.data || error.message);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axiosInstance.delete(`/articles/${id}`);
      alert("게시글이 삭제되었습니다.");
      router.push("/articles");
    } catch (error: any) {
      console.error(" 삭제 실패:", error.response?.data || error.message);
      alert("삭제에 실패했습니다.");
    }
  };

  if (!post)
    return (
      <div className="text-center py-10">게시글을 불러오는 중입니다...</div>
    );

  return (
    <div className="max-w-[1200px] mx-auto mt-9 bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-sm text-gray-500 bg-transparent px-4 py-2 rounded-lg"
          >
            <BsThreeDotsVertical className="h-5 w-5 text-gray-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-300 rounded-lg z-10">
              <ul>
                <li
                  onClick={() => router.push(`/articles/${id}/edit`)}
                  className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100 cursor-pointer"
                >
                  수정하기
                </li>
                <li
                  onClick={handleDelete}
                  className="px-4 py-2 text-center text-secondary-500 hover:bg-gray-100 cursor-pointer"
                >
                  삭제하기
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-8 h-8">
            <Image
              src={"/images/products/userProfile.png"}
              alt="작성자"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex space-x-2">
            <span className="font-semibold">총명한판다</span>
            <span className="text-secondary-400">
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center ml-auto space-x-2">
          <CiHeart className="h-6 w-6 text-gray-400" />
          <span>{post.heartCount ?? 0}</span>
        </div>
      </div>

      <div className="text-lg text-gray-700 whitespace-pre-wrap mb-10">
        {post.content}
      </div>

      <div className="max-w-[1200px] mx-auto mt-6">
        <div className="text-xl font-semibold text-gray-800 mb-2">댓글달기</div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요"
          rows={4}
          className="w-full px-6 py-4 resize-none bg-gray-100 focus:outline-none placeholder-secondary-400 rounded-2xl"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
} 