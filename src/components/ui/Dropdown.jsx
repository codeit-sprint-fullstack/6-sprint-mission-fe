"use client";

import { deleteArticle } from "@/lib/api";
import { getMe } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function DropdownMenu({ id, type, article }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const menuRef = useRef(null);

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    const checkAuthor = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        // 토큰이 없으면 작성자가 아님
        if (!accessToken) {
          setIsAuthor(false);
          setLoading(false);
          return;
        }

        // 현재 사용자 정보 가져오기
        const userData = await getMe(accessToken);
        setCurrentUser(userData);

        // 게시글의 작성자 ID와 현재 사용자 ID 비교
        if (article && article.writer && userData) {
          setIsAuthor(article.writer.id === userData.id);
        }

        setLoading(false);
      } catch (error) {
        console.error("사용자 확인 오류:", error);
        setIsAuthor(false);
        setLoading(false);
      }
    };

    checkAuthor();
  }, [article]);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 게시글 삭제
  const handleDelete = async () => {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await deleteArticle(id);
        router.push("/free-board");
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // 게시글 수정 페이지로 이동
  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  // 로딩 중이거나 작성자가 아니면 드롭다운 버튼 표시하지 않음
  if (loading) {
    return null; // 로딩 중에는 아무것도 표시하지 않음
  }

  if (!isAuthor) {
    return null; // 작성자가 아니면 드롭다운 메뉴 자체를 렌더링하지 않음
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="게시글 메뉴"
      >
        <Image
          src="/ic_more-vertical.svg"
          alt="더보기"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-[120px] bg-white border border-primary-200 rounded-[8px] shadow-lg z-10 overflow-hidden mt-1">
          <button
            onClick={handleEdit}
            className="w-full text-left px-4 py-3 text-[14px] hover:bg-primary-100 transition-colors flex items-center"
          >
            <span className="text-primary-800">수정하기</span>
          </button>
          <div className="h-[1px] bg-primary-200"></div>
          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-3 text-[14px] text-red-500 hover:bg-primary-100 transition-colors flex items-center"
          >
            <span>삭제하기</span>
          </button>
        </div>
      )}
    </div>
  );
}
