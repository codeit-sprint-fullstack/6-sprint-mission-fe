"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ 추가
import CommentSection from "@/components/comment/CommentSection";
import ProductOverview from "./_components/ProductOverview";
import { productsService } from "@/api/products.js";
import { useAuth } from "@/providers/AuthProvider";

export default function ItemDetailPage() {
  const params = useParams(); // ✅ URL 파라미터 읽기
  const { id } = params;

  const { user } = useAuth();

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return; // id 없으면 요청 안 함

    const fetchProductDetail = async () => {
      try {
        const response = await productsService.getDetailProduct(id as string);
        setProductDetail(response);
      } catch (error) {
        console.error("상품 상세 조회 실패:", error);
        setError("상품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center">
        <p>상품 정보를 불러오는 중입니다...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[500px] items-center justify-center">
        <p>{error}</p>
      </section>
    );
  }

  if (!productDetail) {
    return (
      <section className="flex min-h-[500px] items-center justify-center">
        <p>상품 정보를 찾을 수 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center">
      <div className="flex w-full max-w-[1200px] flex-col px-6 py-6">
        <ProductOverview product={productDetail} user={user} />
        <CommentSection type="products" parentId={id as string} user={user!} />
      </div>
    </section>
  );
}
