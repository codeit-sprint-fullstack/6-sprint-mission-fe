"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/product/ProductForm";

export default function Registration() {
  const router = useRouter();

  const handleCreate = async (data) => {
    // const result = await productRegistration(data);
    const itemId = "mock-id";
    // 이동을 어디로 할지 고민하기
    router.push(`/items/${itemId}`);
  };

  return (
    <div className="flex w-full justify-center">
      <ProductForm onSubmit={handleCreate} submitText="등록" />
    </div>
  );
}
