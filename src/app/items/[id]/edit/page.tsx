"use client";

import ProductForm from "@/app/items/registration/_components/ProductForm";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { productsService } from "@/api/products.js";
import { ProductFormData, ProductEditFormData } from "@/types/product";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsService.getDetailProduct(id as string);
        const data = response.data;

        // API에서 반환된 데이터에서 필요한 필드만 추출
        const formattedProduct: ProductFormData = {
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          tags: data.tags || [],
          images: data.image || [], // image → images로 수정
        };

        setProduct(formattedProduct);
      } catch (error) {
        console.error("상품 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 수정 저장 함수 - API 요구 형식에 맞게 데이터 변환
  const handleSaveChanges = async (formData: ProductEditFormData) => {
    try {
      const form = new FormData();

      // 👉 상품 텍스트 필드들
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", String(formData.price));
      form.append("tags", JSON.stringify(formData.tags)); // 배열은 문자열로
      form.append(
        "existingImages",
        JSON.stringify(formData.existingImages || [])
      );

      // 👉 새 이미지 파일 추가
      if (formData.newImages && formData.newImages.length > 0) {
        formData.newImages.forEach((file: File) => {
          form.append("images", file); // 서버에서 multer.array("images")로 받으면 됨
        });
      }

      // 👉 통합 FormData로 업데이트 요청
      await productsService.updateProduct(id as string, form); // 이 API는 multipart/form-data 지원해야 함

      router.push(`/items/${id}`);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex w-full justify-center">
      <ProductForm
        initialData={product || undefined}
        onSubmit={handleSaveChanges}
        submitText="수정"
      />
    </div>
  );
}
