"use client";

import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";
import { formatNumber } from "@/components/utils";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE = "https://panda-market-api.vercel.app";

/* ─ 좋아요 버튼 ─ */
function LikePill({ itemId, initLike = false, initCount = 0 }) {
  const [like, setLike] = useState(initLike);
  const [count, setCount] = useState(initCount);

  const toggle = async () => {
    await fetch(`${BASE}/products/${itemId}/favorite`, {
      method: like ? "DELETE" : "POST",
    });
    setLike(!like);
    setCount((c) => (like ? c - 1 : c + 1));
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 pl-4 pr-5 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-gray-50"
    >
      {like ? (
        <AiFillHeart className="w-5 h-5 text-pink-500" />
      ) : (
        <AiOutlineHeart className="w-5 h-5" />
      )}
      {count}
    </button>
  );
}

/* ─ ⋯ 메뉴 ─ */
function ActionMenu({ itemId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const remove = async () => {
    if (!confirm("상품을 삭제하시겠습니까?")) return;
    await fetch(`${BASE}/products/${itemId}`, { method: "DELETE" });
    alert("삭제되었습니다.");
    router.push("/products");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded hover:bg-gray-100"
      >
        <BsThreeDotsVertical className="w-5 h-5 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow text-sm z-10">
          <li
            onClick={() => router.push(`/products/${itemId}/edit`)}
            className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
          >
            수정하기
          </li>
          <li
            onClick={remove}
            className="px-4 py-2 text-center hover:bg-gray-100 cursor-pointer"
          >
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
}

export default function ProductInfo({ item }) {
  return (
    <div className="relative grid md:grid-cols-[350px_1fr] gap-8">
      {/* 메뉴: 제목 우상단(고정) */}
      <div className="absolute top-0 right-0">
        <ActionMenu itemId={item.id} />
      </div>

      {/* 이미지 */}
      <div className="w-full rounded-xl overflow-hidden">
        <ImageWithFallback
          src={item.images?.[0]}
          alt={item.name}
          width={350}
          height={350}
          className="object-cover w-full h-full"
        />
      </div>

      {/* 정보 */}
      <div>
        <h1 className="text-2xl font-semibold mb-3">{item.name}</h1>
        <p className="text-3xl font-bold mb-6">{formatNumber(item.price)}원</p>

        {/* 소개 */}
        <h3 className="font-semibold mb-1">상품 소개</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {item.description}
        </p>

        {/* 태그 */}
        {item.tags?.length > 0 && (
          <>
            <h3 className="font-semibold mt-6 mb-1">상품 태그</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                >
                  #{t}
                </span>
              ))}
            </div>
          </>
        )}

        {/* 작성자 · 날짜 · | · ❤ */}
        <div className="flex items-center mt-8">
          {/* 작성자 */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/images/products/userProfile.png"
                alt="프로필"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">
                {item.sellerNickname ?? "익명판매자"}
              </span>
              <span className="text-xs text-gray-400">
                {(item.createdAt ?? "").slice(0, 10)}
              </span>
            </div>
          </div>

          {/* 오른쪽 끝: 세로선 + 하트 */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden md:block h-8 border-l border-gray-300" />
            <LikePill
              itemId={item.id}
              initLike={item.isLiked}
              initCount={item.favoriteCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
