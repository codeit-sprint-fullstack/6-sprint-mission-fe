"use client";

import React, { useState } from "react";
import { fetchProduct } from "@/lib/product";
import Button from "../common-UI/Button";
import InputField from "../login-signup/InputField";
import { useRouter } from "next/navigation";

interface ProductData {
  images: string;
  tags: string;
  price: string;
  description: string;
  name: string;
}

interface PatchProductProps {
  data: ProductData;
  productId: string;
  accessToken: string;
}

function PatchProduct({ data, productId, accessToken }: PatchProductProps) {
  const router = useRouter();

  const [images, setImages] = useState<string>(data.images);
  const [tags, setTags] = useState<string>(data.tags);
  const [price, setPrice] = useState<string>(String(data.price));
  const [description, setDescription] = useState<string>(data.description);
  const [name, setName] = useState<string>(data.name);

  const handleConfirmProductData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const patchData: Partial<ProductData> = {};

    if (images !== data.images) {
      patchData.images = images;
    }
    if (tags !== data.tags) {
      patchData.tags = tags;
    }
    if (price !== data.price) {
      patchData.price = price;
    }
    if (description !== data.description) {
      patchData.description = description;
    }
    if (name !== data.name) {
      patchData.name = name;
    }

    try {
      await fetchProduct(productId, accessToken, patchData);
    } catch (e) {
      console.error("상품 수정 중 에러 발생", e);
    } finally {
      router.push("/items");
    }
  };

  return (
    <form onSubmit={handleConfirmProductData}>
      <InputField
        label="이미지"
        type="text"
        placeholder="상품의 URL 입력하세요"
        value={images}
        onChange={(e) => setImages(e.target.value)}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="태그"
        type="text"
        placeholder="상품의 태그를 입력하세요"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="내용"
        type="text"
        placeholder="상품의 제목을 입력하세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="가격"
        type="number"
        placeholder="상품의 가격을 입력하세요"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="제목"
        type="text"
        placeholder="상품의 제목을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        width="w-[640px]"
        height="h-[56px]"
      />

      <Button text="상품 수정 완료" />
    </form>
  );
}

export default PatchProduct;
