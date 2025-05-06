/**
 * type: 페이지별 하드 코딩
 */

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";

function UDDropdownMenu({ type, isComment = false, id }) {
  const [isOpen, setIsOpen] = useState(false);

  const UDMenuRef = useRef();
  const router = useRouter();
  const baseUrl = "http://localhost:3000";

  const toggleClick = () => setIsOpen(!isOpen);

  // 선택 상자 바깥을 클릭하면 창 닫힘
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (UDMenuRef.current && !UDMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 수정하기
  const handleEdit = () => {
    if (!isComment && type === "product") {
      router.push(`/items/${id}/edit`);
    }
  };

  return (
    <div ref={UDMenuRef} className="relative">
      {/* 아이콘 */}
      <IoMdMore
        onClick={toggleClick}
        className="cursor-pointer text-gray-400 w-[24px] h-[24px]"
      />

      {isOpen && (
        <div className="absolute w-[102px] md:w-[140px] bg-white border border-gray-300 rounded-[6px] right-2 lg:right-0 lg:left-6 lg:top-1">
          <ul>
            <li
              onClick={handleEdit}
              className="text-center pt-[16px] pb-[12px] cursor-pointer"
            >
              <span className="text-gray-500">수정하기</span>
            </li>
            <li
              // onClick={handleDelete}
              className="text-center pt-[12px] pb-[16px] cursor-pointer"
            >
              <span className="text-gray-500">삭제하기</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UDDropdownMenu;
