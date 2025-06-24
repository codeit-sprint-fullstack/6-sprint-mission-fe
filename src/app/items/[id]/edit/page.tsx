"use client";

import ProductForm from "@/app/items/registration/_components/ProductForm";
import { useRouter, useParams } from "next/navigation";
import { useProduct } from "@/hooks/Products/useProduct";
import { ProductEditFormData } from "@/types/product";
import LoadingState from "@/components/common/LoadingState";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { product, loading, error, updateProduct } = useProduct(id as string);

  // 상품 수정 핸들러
  const handleSaveChanges = async (formData: ProductEditFormData) => {
    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", String(formData.price));
      form.append("tags", JSON.stringify(formData.tags));

      // 기존 이미지 유지
      if (formData.existingImages && formData.existingImages.length > 0) {
        form.append("existingImages", JSON.stringify(formData.existingImages));
      }

      // 새 이미지 추가
      if (formData.newImages && formData.newImages.length > 0) {
        formData.newImages.forEach((file: File) => {
          form.append("images", file);
        });
      }

      await updateProduct(form);
      router.push(`/items/${id}`);
    } catch (error) {
      console.error("상품 수정 실패:", error);
      alert("상품 수정에 실패했습니다.");
    }
  };

  return (
    <main className="flex w-full justify-center px-5 py-7">
      <LoadingState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && !product}
        loadingMessage="상품 정보를 불러오는 중..."
        errorMessage="상품을 불러오는데 실패했습니다."
        emptyMessage="상품 정보를 찾을 수 없습니다."
      />

      {product && (
        <ProductForm
          initialData={{
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            tags: product.tags || [],
            images: product.images || [],
          }}
          onSubmit={handleSaveChanges}
          submitText="수정"
        />
      )}
    </main>
  );
}
