"use client";

import { useParams } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

/**
 * 클라이언트 컴포넌트 page.jsx
 * - useParams() 로 동기적으로 id 가져오기 → 경고 해결
 * - 나머지 로직은 하위 클라이언트 컴포넌트에 위임
 */
export default function ProductDetailPage() {
  const { id } = useParams(); // ✅ 경고 없이 즉시 사용 가능

  if (!id) return null; // id 로딩 중 예외 처리

  return <ProductDetailClient productId={id} />;
}
