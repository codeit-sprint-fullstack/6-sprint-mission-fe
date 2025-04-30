"use client";

import { useState } from "react";
import { fetchProduct } from "@/lib/product";
import Button from "../common-UI/Button";
import InputField from "../login-signup/InputField";
import { useRouter } from "next/navigation";

function PatchProduct({ data, productId, accessToken }) {
  const router = useRouter();

  const [images, setImages] = useState(data.images);
  const [tags, setTags] = useState(data.tags);
  const [price, setPrice] = useState(data.price);
  const [description, setDescription] = useState(data.description);
  const [name, setName] = useState(data.name);

  const handleConfirmProductData = async (e) => {
    e.preventDefault();

    const patchData = {};

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
        // onBlur={onBlur}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="태그"
        type="text"
        placeholder="상품의 태그를 입력하세요"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        // onBlur={onBlur}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="내용"
        type="text"
        placeholder="상품의 제목을 입력하세요"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        // onBlur={onBlur}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="가격"
        type="number"
        placeholder="상품의 가격을 입력하세요"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        // onBlur={onBlur}
        width="w-[640px]"
        height="h-[56px]"
      />

      <InputField
        label="제목"
        type="text"
        placeholder="상품의 제목을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        // onBlur={onBlur}
        width="w-[640px]"
        height="h-[56px]"
      />

      <Button
        text="상품 수정 완료"
        // onClick={handleConfirmProductData}
        // disabled={true}
        // width
        // height
        // rounded
      />
    </form>
  );
}

export default PatchProduct;
