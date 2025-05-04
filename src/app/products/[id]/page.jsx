"use client";

import { useParams } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export default function ProductDetailPage() {
  const { id } = useParams(); 

  if (!id) return null; 

  return <ProductDetailClient productId={id} />;
}
