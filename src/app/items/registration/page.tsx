"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/app/items/registration/_components/ProductForm";
import { productsService } from "@/api/products";
import { ProductFormData } from "@/types/product";

export default function Registration() {
  const router = useRouter();

  const handleCreate = async (productData: ProductFormData) => {
    try {
      console.log("전송할 상품 데이터:", productData);

      // FormData 객체 생성
      const form = new FormData();

      // 👉 상품 텍스트 필드들
      form.append("name", productData.name);
      form.append("description", productData.description);
      form.append("price", String(productData.price));
      form.append("tags", JSON.stringify(productData.tags)); // 배열은 문자열로 변환

      // 👉 이미지 파일 추가
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((file: File) => {
          form.append("images", file); // 서버에서 multer.array("images")로 받음
        });
      }

      // API 연동
      const result = await productsService.createProduct(form);
      console.log("상품 등록 결과:", result);

      if (result && result.data && result.data.id) {
        alert(result.message || "상품이 성공적으로 등록되었습니다.");
        router.push(`/items/${result.data.id}`);
      } else {
        throw new Error("상품 등록 후 ID를 받지 못했습니다.");
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <div className="flex w-full justify-center">
      <ProductForm onSubmit={handleCreate} submitText="등록" />
    </div>
  );
}
