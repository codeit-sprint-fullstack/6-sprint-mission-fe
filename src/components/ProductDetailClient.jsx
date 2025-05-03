"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductInfo from "@/components/ProductInfo";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import Image from "next/image";

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

      // 2) 댓글 가져오기
      const cRes = await fetch(
        `${BASE}/products/${productId}/comments?limit=20`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const cRaw = await cRes.json();
      const list = cRaw.list ?? [];
      setComments(Array.isArray(list) ? list : []);

      setLoading(false);
    };
    fetchData();
  }, [productId]);

  /* 댓글 작성 */
  const addComment = async (content) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다. 먼저 로그인하세요!");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(`${BASE}/products/${productId}/comments`, {
      method: "POST",
      headers,
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert(errorData.message || "댓글 작성에 실패했습니다.");
      return;
    }

    const raw = await res.json();

    const newComment = {
      id: raw.id ?? Date.now(),
      content,
      createdAt: raw.createdAt ?? new Date().toISOString(),
      nickname: raw.nickname ?? "익명팬더",
    };

    setComments((prev) => [newComment, ...prev]);
  };

  if (loading) return <p className="p-8">로딩 중...</p>;
  if (!item) return <p className="p-8">상품을 찾을 수 없습니다.</p>;

  const commentPlaceholder =
    "개인정보를 공유 및 요청하거나, 협의 취소, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  return (
    <div className="max-w-[900px] mx-auto px-4 pt-6 pb-16">
      <div className="grid gap-8 mb-12">
        <ProductInfo item={item} />
      </div>

      <CommentForm onSubmit={addComment} placeholder={commentPlaceholder} />

      {comments.length > 0 ? (
        <CommentList comments={comments} setComments={setComments} />
      ) : (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-600">
          <Image
            src="/images/products/nonecomments.png"
            alt="댓글 없음"
            width={160}
            height={160}
          />
          <p className="text-base text-gray-400">아직 문의가 없어요</p>
        </div>
      )}

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
