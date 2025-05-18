"use client";

import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import "@/components/css/input.scss";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import icPlus from "@/assets/ic_plus.png";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { postItem } from "@/api/items";

function PostForm() {
  const router = useRouter();
  const imageRef = useRef();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]); // 실제 태그가 적용되었는가 여부
  const [tagInput, setTagInput] = useState(""); // 태그 입력창
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});

  // 상품 등록 처리 - 연동
  const mutation = useMutation({
    mutationFn: postItem,
    onSuccess: () => {
      router.push("/items");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  // 유효성 검사
  const validate = () => {
    const newError = {};

    if (!name || name.length > 10) newError.name = "10자 이내로 입력해주세요.";
    if (!description || description.length < 10)
      newError.description = "10자 이상 입력해주세요.";
    if (!/^\d+$/.test(price)) newError.price = "숫자로 입력해주세요."; // 정규 표현식 공부할 것
    if (tagInput.length > 5) newError.tag = "5자 이내로 입력해주세요.";
    setErrors(newError);

    return Object.keys(newError).length === 0; // 클래스 문법 공부할 것
  };

  const handleSubmit = () => {
    if (!validate()) return; // 유효성 검사 실패하면 제출x

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    tags.forEach((tag) => formData.append("tags", tag));
    images.forEach((file) => formData.append("images", file));

    mutation.mutate(formData);
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed === "") return;

      if (trimmed.length > 5) {
        setErrors((prev) => ({ ...prev, tag: "5자 이내로 입력해주세요." }));
        return;
      }

      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  // 태그 제거
  const handleTagRemove = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  // 이미지 함수
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...images, ...files].slice(0, 3);

    setImages(updatedImages);
  };

  return (
    <form className="p-[32px] lg:px-50 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-700-20 text-gray-800">상품 등록하기</h2>
        <Button
          type="button"
          size="sm"
          disabled={mutation.isPending}
          onClick={handleSubmit}
        >
          {mutation.isPending ? "등록 중" : "등록"}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-700-18 text-gray-800">상품 이미지</label>
        <div className="flex gap-2.5">
          {/* 이미지 추가 부분 */}
          <button
            type="button"
            onClick={() => imageRef.current?.click()}
            className="w-42 h-42 rounded-[12px] px-[47px] py-[42px] bg-gray-200 flex flex-col justify-center items-center gap-3 cursor-pointer"
          >
            <Image src={icPlus} alt="이미지 등록 버튼" />
            <span className="text-gray-400">이미지 등록</span>
          </button>

          {/* 추가된 이미지 */}
          {images.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`상품 이미지-${idx}`}
              className="w-42 h-42 rounded-[12px]"
            />
          ))}

          {/* input-file (숨김) */}
          <input
            ref={imageRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-700-18 text-gray-800">상품명</label>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={clsx(
              errors.name && "border border-error mb-2.5",
              "input outline-none"
            )}
            placeholder="상품명을 입력해주세요"
          />
          {errors.name && (
            <p className="px-3 text-error text-600-14">{errors.name}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-700-18 text-gray-800">상품 소개</label>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={clsx(
              errors.description && "border border-error mb-2.5",
              "input outline-none h-[282px] resize-none"
            )}
            placeholder="상품 소개를 입력해주세요"
          />
          {errors.description && (
            <p className="px-3 text-error text-600-14">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-700-18 text-gray-800">판매 가격</label>
        <div>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={clsx(
              errors.price && "border border-error mb-2.5",
              "input outline-none"
            )}
            placeholder="판매 가격을 입력해주세요"
          />
          {errors.price && (
            <p className="px-3 text-error text-600-14">{errors.price}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-700-18 text-gray-800">태그</label>
        <div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)} // 입력
            onKeyDown={handleTagAdd} // 제출
            className={clsx(
              errors.tag && "border border-error mb-2.5",
              "input outline-none"
            )}
            placeholder="태그를 입력해주세요"
          />
          {errors.tag && (
            <p className="px-3 text-error text-600-14">{errors.tag}</p>
          )}
        </div>
        <span>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 px-3 py-[6px] h-8 inline-flex gap-2 items-center justify-center rounded-[9999px]"
            >
              #{tag}
              <button
                type="button cursor-point"
                onClick={() => handleTagRemove(tag)}
                className="bg-gray-400 text-white w-5 h-5 rounded-[100%] flex items-center justify-center"
              >
                X
              </button>
            </span>
          ))}
        </span>
      </div>
    </form>
  );
}

export default PostForm;
