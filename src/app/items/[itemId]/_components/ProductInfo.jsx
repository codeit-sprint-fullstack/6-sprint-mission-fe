"use client";

import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEllipsisV } from "react-icons/fa";

export default function ProductInfo({ product, onEdit, onDelete }) {
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    name,
    price,
    description,
    tags = [],
    ownerNickname,
    createdAt,
    favoriteCount,
    images,
  } = product;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <section className="relative flex flex-col md:flex-row gap-10 w-full max-w-[1200px] mx-auto mt-6">
      {/* 오른쪽 상단 점점점 메뉴 */}
      <div className="absolute top-0 right-0 z-10" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 text-gray-400"
        >
          <FaEllipsisV size={24} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 w-[139px] h-[92px] text-center mt-2 py-2 text-[16px] font-[400] text-secondary-500 bg-white border border-[#D1D5DB]">
            <button onClick={onEdit} className="block w-full px-4 py-2">
              수정하기
            </button>
            <button onClick={onDelete} className="block w-full px-4 py-2">
              삭제하기
            </button>
          </div>
        )}
      </div>

      {/* 왼쪽 상품 이미지 */}
      <div className="w-full relative max-w-[486px] h-[486px] rounded-[16px] overflow-hidden">
        <Image src={images?.[0]} alt={name} fill className="object-cover" />
      </div>

      {/* 오른쪽 상품 정보 */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* 상품명 & 가격 */}
          <h2 className="text-2xl font-semibold text-secondary-800">{name}</h2>
          <p className="text-[40px] font-semibold mt-4 mb-4 text-secondary-800">
            {price.toLocaleString()}원
          </p>

          {/* 설명 */}
          <div className="mb-6">
            <h3 className="font-semibold text-[16px] text-secondary-600 mb-4">
              상품 소개
            </h3>
            <p className="font-[400] text-[16px] text-secondary-600">
              {description}
            </p>
          </div>

          {/* 태그 */}
          <div className="mb-16">
            <h3 className="font-semibold text-[16px] text-secondary-600 mb-4">
              상품 태그
            </h3>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-gray-100 text-secondary-800 rounded-[26px] text-[16px] font-[400]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 판매자 & 날짜 & 좋아요 */}
        <div className="flex items-center justify-between">
          {/* 왼쪽: 프로필 이미지 + 닉네임 + 날짜 */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/images/profile.png"
                alt="프로필"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col font-medium text-[14px]">
              <span className="text-secondary-600">{ownerNickname}</span>
              <span className="font-[400] text-secondary-400">
                {new Date(createdAt)
                  .toISOString()
                  .slice(0, 10)
                  .replaceAll("-", ". ")}
              </span>
            </div>

            {/* 세로 라인 */}
            <div className="w-[1px] h-[34px] bg-gray-200 mx-8" />
          </div>

          {/* 오른쪽: 좋아요 버튼 */}
          <div className="flex items-center gap-1 px-3 py-1 border border-secondary-200 rounded-full text-secondary-500 text-[16px] font-medium">
            <FaHeart className="text-secondary-500" />
            <span>{favoriteCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
}