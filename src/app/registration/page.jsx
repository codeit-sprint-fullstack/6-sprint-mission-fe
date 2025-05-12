"use client";

import Button from "@/components/ui/common-UI/Button";
import InputField from "@/components/ui/common-UI/InputField";
import { postProduct } from "@/lib/product";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { checkTokenExp } from "../../../utils/checkTokenExp";

function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const router = useRouter();

  //토큰 유효성 체크
  useEffect(() => {
    if (!checkTokenExp()) {
      router.push("/login");
    }
  }, []);

  const handlePost = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const postData = new FormData();
    postData.append("name", title);
    postData.append("description", content);
    postData.append("price", Number(price));
    postData.append("tags", JSON.stringify(tags));
    if (images.length > 0) {
      postData.append("image", images[0]);
    }

    try {
      const product = await postProduct(postData, accessToken);

      //예외처리하기
      router.push(`/items`);
    } catch (e) {
      console.error("상품 등록 중 에러 발생", e);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];

    if (newImages.length > 3) {
      alert("이미지는 최대 3개까지만 업로드할 수 있습니다.");
      return;
    }
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="pt-[94px] mb-[162px] flex flex-col w-[1200px] ">
        <div className="flex flex-row justify-between mb-[32px]">
          <div className="font-pretendard font-bold text-[20px]">
            상품 등록하기
          </div>

          <Button
            text={"등록"}
            onClick={handlePost}
            disabled={!title || !content || !price || !tags}
            width={"w-[74px]"}
            height={"h-[42px]"}
          />
        </div>

        <div className="font-pretendard font-bold text-[18px]">상품 이미지</div>
        <div className="flex felx-row items-center gap-[24px] mt-[16px] mb-[12px] ">
          {images.length < 4 && (
            <img
              src="/image/ui/addProductImg.png"
              alt="이미지 선택하기"
              className="w-[282px] h-[282px] cursor-pointer"
              onClick={handleImageClick}
            />
          )}
          {images.map((img, index) => (
            <div key={index} className="relative w-[282px] h-[282px]">
              <img
                src={URL.createObjectURL(img)}
                alt="선택된 이미지"
                className="w-full h-full rounded-[12px] object-cover overflow-hidden"
              />
              <img
                src="/image/ui/cancelTag.png"
                alt="이미지 선택 취소"
                className="absolute bottom-[240px] left-[240px] cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
          multiple
        />

        <div className="font-pretendard font-bold text-[18px] mb-[12px]">
          상품명
        </div>
        <InputField
          value={title}
          onChange={handleTitleChange}
          placeholder={"상품명을 입력해주세요"}
          height={"h-[56px]"}
        />

        <div className="font-pretendard font-bold text-[18px] mt-[32px]">
          상품 소개
        </div>
        <InputField
          value={content}
          onChange={handleContentChange}
          placeholder={"내용을 입력해주세요"}
          height={"h-[282px]"}
        />

        <div className="font-pretendard font-bold text-[18px] mt-[32px]">
          판매가격
        </div>
        <InputField
          value={price}
          onChange={handlePriceChange}
          placeholder={"판매 가격을 입력해주세요"}
          height={"h-[56px]"}
        />

        <div className="font-pretendard font-bold text-[18px] mt-[32px]">
          태그
        </div>
        <InputField
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyDown}
          placeholder={"태그를 입력해주세요"}
          height={"h-[56px]"}
        />

        <div className="flex flex-row gap-[8px] h-[36px] mt-[14px]">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center rounded-[26px] bg-third px-[16px] py-[5px] gap-[8px]"
            >
              # {tag}
              <img
                src="/image/ui/cancelTag.png"
                className="cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
