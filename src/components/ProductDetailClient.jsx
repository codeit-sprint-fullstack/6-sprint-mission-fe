"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductInfo from "@/components/ProductInfo";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";

const BASE = "https://panda-market-api.vercel.app";

export default function ProductDetailClient({ productId }) {
  const router = useRouter();

  /* 상태 */
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 상품 + 댓글 불러오기 */
  useEffect(() => {
    const fetchData = async () => {
      // 1) 상품
      const res = await fetch(`${BASE}/products/${productId}`);
      const product = await res.json();
      setItem(product);

      // 2) 댓글
      const cRes = await fetch(`${BASE}/Products/${productId}/Comments`);
      const cRaw = await cRes.json();
      const list = cRaw.data ?? cRaw;
      setComments(Array.isArray(list) ? list : []);

      setLoading(false);
    };
    fetchData();
  }, [productId]);

  /* 댓글 작성 */
  const addComment = async (content) => {
    // 1) 서버에 등록
    const res = await fetch(`${BASE}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, content }),
    });
    const raw = await res.json(); // { id, createdAt, nickname, ... }

    // 2) 화면에 즉시 보여줄 새 객체 구성
    const newComment = {
      id: raw.id ?? Date.now(), // id 없으면 임시 키
      content,
      createdAt: raw.createdAt ?? new Date().toISOString(),
      nickname: raw.nickname ?? "익명팬더",
    };

    // 3) 목록 앞에 추가
    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) return <p className="p-8">로딩 중...</p>;
  if (!item) return <p className="p-8">상품을 찾을 수 없습니다.</p>;

  /* 댓글 안내 placeholder */
  const commentPlaceholder =
    "개인정보를 공유 및 요청하거나, 협의 취소, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  return (
    <div className="max-w-[900px] mx-auto px-4 pt-6 pb-16">
      {/* 상품 메인 */}
      <div className="grid  gap-8 mb-12">
        <ProductInfo item={item} />
      </div>

      {/* 댓글 입력 + 목록 */}
      <CommentForm onSubmit={addComment} placeholder={commentPlaceholder} />
      <CommentList comments={comments} setComments={setComments} />

      {/* 목록으로 돌아가기 */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center gap-2"
        >
          목록으로 돌아가기 ↩
        </button>
      </div>
    </div>
  );
}
