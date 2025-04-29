"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputItem from "@/components/ui/InputItem";
import TagInput from "@/components/ui/TagInput";
import { addProduct } from "@/api/items";

export default function CreateItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateName = (value) => {
    if (value.length < 2 || value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        name: "2자 이상 10자 이내로 입력해주세요",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateDescription = (value) => {
    if (value.length < 10) {
      setErrors((prev) => ({
        ...prev,
        description: "10자 이상 입력해주세요.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const validatePrice = (value) => {
    if (!/^\d+$/.test(value)) {
      setErrors((prev) => ({ ...prev, price: "숫자로 입력해주세요." }));
    } else {
      setErrors((prev) => ({ ...prev, price: undefined }));
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).some((key) => errors[key])) return;

    const productData = {
      name,
      description,
      price: Number(price),
      tags,
    };

    try {
      const result = await addProduct(productData);
      console.log("상품 등록 성공:", result);
      router.push(`/items/${result.id}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">상품 등록하기</h1>
          <button
            type="submit"
            className={`
              bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
              focus:outline-none focus:shadow-outline
              ${!name || !description || !price || !tags.length ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={!name || !description || !price || !tags.length}
          >
            등록
          </button>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder="상품명을 입력해 주세요"
            error={errors.name}
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              validateDescription(e.target.value);
            }}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
            error={errors.description}
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              validatePrice(e.target.value);
            }}
            placeholder="판매 가격을 입력해 주세요"
            error={errors.price}
          />

          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        </div>
      </form>
    </div>
  );
}
