"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductInfo from "@/components/ProductInfo";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";
import { Product } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  nickname: string;
}

interface ProductDetailClientProps {
  productId: number;
}

export default function ProductDetailClient({
  productId,
}: ProductDetailClientProps) {
  const router = useRouter();

  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { accessToken, nickname } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {};

        const res = await fetch(`${BASE}/products/${productId}`, { headers });
        const data = await res.json();
        const product = data.product ?? data;
        setItem(product);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, accessToken]);

  const addComment = async (content: string) => {
    if (!accessToken) {
      router.push("/login");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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

    setRefreshTrigger((prev) => prev + 1);
  };

  if (loading) return <p className="p-8">로딩 중...</p>;
  if (!item) return <p className="p-8">상품을 찾을 수 없습니다.</p>;

  const commentPlaceholder =
    "개인정보를 공유 및 요청하거나, 협의 취소, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  return (
    <div className="max-w-[900px] mx-auto px-4 pt-6 pb-16">
      <div className="grid gap-8 mb-12">
        <ProductInfo
          item={{
            ...item,
            isLiked: item.isLiked ?? false,
            favoriteCount: item.favoriteCount ?? 0,
          }}
        />
      </div>

      <CommentForm onSubmit={addComment} placeholder={commentPlaceholder} />

      <CommentList
        resourceType="products"
        resourceId={productId}
        refreshTrigger={refreshTrigger}
      />

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