/**
 * 고치다 말고 새로 만들었음. 나중에 UDDropdownMenu와 통합 필요.
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Text } from "./text/text";
import { IoMdMore } from "react-icons/io";
import { useRouter } from "next/navigation";

function UDselectBox({ type, id, commentId }) {
  const [isOpen, setIsOpen] = useState(false);

  const UDBoxRef = useRef(null);
  const router = useRouter();
  const baseURL = "http://localhost:3002"; // 예전 것

  const toggleClick = () => setIsOpen(!isOpen);

  // 선택 상자 바깥을 클릭하면 창 닫힘
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (UDBoxRef.current && !UDBoxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 수정하기
  const handleEdit = async () => {
    if (!commentId) {
      router.push(`/articles/${id}/edit`);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/${id}/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("게시글/댓글 수정 실패");

      setIsOpen(false);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    }
  };

  // 삭제하기
  const handleDelete = async () => {
    if (!confirm("정말로 글을 삭제하시겠습니까?")) return;

    try {
      const url = commentId
        ? `${baseURL}/articles/${articleId}/${commentId}`
        : `${baseURL}/articles/${articleId}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("게시글/댓글 삭제 실패");

      alert("삭제 완료");
      setIsOpen(false);

      if (!commentId) router.push("/articles"); // 게시글 삭제 시 목록으로 이동
    } catch (error) {
      console.error(error);
      alert("게시글/댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <div ref={UDBoxRef} className="relative">
      {/* 아이콘 */}
      <IoMdMore
        onClick={toggleClick}
        className="cursor-pointer text-gray-400"
      />

      {/* SelectBox */}
      {isOpen && (
        <div className="absolute w-[102px] md:w-[140px] bg-white right-0 border border-gray-300 rounded-[6px]">
          <ul>
            <li
              onClick={handleEdit}
              className="text-center pt-[16px] pb-[12px] cursor-pointer"
            >
              <Text color="text-gray-500">수정하기</Text>
            </li>
            <li
              onClick={handleDelete}
              className="text-center pt-[12px] pb-[16px] cursor-pointer"
            >
              <Text color="text-gray-500">삭제하기</Text>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UDselectBox;
