"use client";

import ProductForm from "@/app/items/registration/_components/ProductForm";

export default function Registration() {
  return (
    <div className="flex w-full justify-center">
      <ProductForm submitText="등록" />
    </div>
  );
}
