"use client";

import ProductForm from "@/components/product/ProductForm";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { productsSevice } from "@/api/products";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsSevice.getDetailProdut(id);

        // 원본 데이터 저장
        setOriginalData(data);

        // API에서 반환된 데이터에서 필요한 필드만 추출
        const formattedProduct = {
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          tags: data.tags || [],
          images: data.images || [],
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
  const handleSaveChanges = async (formData) => {
    try {
      // API 요청에 필요한 형태로 데이터 구성
      const productEditData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        tags: formData.tags,
        images: originalData?.images || [], // 원본 이미지 정보 유지
      };

      await productsSevice.updateProduct(id, productEditData);
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
        initialData={product}
        onSubmit={handleSaveChanges}
        submitText="수정"
      />
    </div>
  );
}
