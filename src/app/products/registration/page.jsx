"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import ProductImageUploader from "@/components/ProductImageUploader";
import ProductInput from "@/components/ProductInput";
import TagInput from "@/components/TagInput";
import SubmitButton from "@/components/SubmitButton";

export default function ProductRegisterPage() {
  const router = useRouter();
  const { accessToken } = useAuth();

  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    if (!productName.trim()) {
      alert("상품명을 입력해주세요.");
      return;
    }
    if (!description.trim()) {
      alert("상품 설명을 입력해주세요.");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      alert("올바른 가격을 입력해주세요.");
      return;
    }
    if (images.length === 0) {
      alert("최소 1개의 상품 이미지를 등록해주세요.");
      return;
    }

    try {
      const imageUrls = [];

      for (const imageObj of images) {
        const imgForm = new FormData();
        imgForm.append("file", imageObj.file);

        const imgRes = await fetch("http://localhost:5000/api/images/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: imgForm,
        });

        if (!imgRes.ok) {
          const errText = await imgRes.text();
          throw new Error("이미지 업로드 실패: " + errText);
        }

        const imgData = await imgRes.json();
        imageUrls.push(imgData.url);
      }

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", price);

      tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      imageUrls.forEach((url) => {
        formData.append("image", url);
      });

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "상품 등록 실패");
      }

      alert("상품이 성공적으로 등록되었습니다!");
      router.push("/products");
    } catch (error) {
      console.error("상품 등록 에러:", error);
      alert(error.message || "상품 등록에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="w-full max-w-[1200px] mx-auto p-4 relative">
        <h1 className="text-xl font-semibold mb-6">상품 등록하기</h1>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="absolute top-0 right-0">
            <SubmitButton />
          </div>

          <ProductImageUploader images={images} setImages={setImages} />
          <ProductInput
            productName={productName}
            setProductName={setProductName}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
          />
          <TagInput tags={tags} setTags={setTags} />
        </form>
      </div>
    </div>
  );
}
