"use client";

import { useParams } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;

  if (!id) return null;

  // productId는 number 타입이어야 하므로 변환
  const productId = Number(id);
  if (isNaN(productId)) return null;

  return <ProductDetailClient productId={productId} />;
} 