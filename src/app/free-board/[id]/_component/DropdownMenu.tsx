"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/articleApi";

interface DropdownMenuProps {
  id: number;
  type: string;
  article: any;
}

export default function DropdownMenu({ id, type, article }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    setIsOpen(false);
    router.push(`/free-board/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        await deleteArticle(id, token);
        alert("삭제되었습니다.");
        router.push("/free-board");
      } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        alert("삭제에 실패했습니다.");
      }
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Image src="/ic_kebab.svg" alt="메뉴" width={24} height={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <button
            onClick={handleEdit}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
