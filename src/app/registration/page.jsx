"use client";

import Button from "@/components/ui/common-UI/Button";
import InputField from "@/components/ui/common-UI/InputField";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(undefined);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const router = useRouter();

  //상품 등록 API 만들기
  // const handlePost = async () => {
  //   //디버깅
  //   console.log("posting is Done");

  //   const postData = {
  //     title: title,
  //     content: content,
  //     price: price,
  //     tag: tag,
  //   };

  //   try {
  //     const { id } = await postProducts(postData);
  //     router.push(`/items`);
  //   } catch (e) {
  //     console.error("상품 등록 중 에러 발생", e);
  //   }
  // };

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

  const handleImageUpload = () => {
    //디버깅
    console.log("이미지 업로드 버튼 클릭!");
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
            // onClick={handlePost}
            disabled={!title || !content}
            width={"w-[74px]"}
            height={"h-[42px]"}
          />
        </div>

        <div className="font-pretendard font-bold text-[18px] mb-[12px]">
          상품 이미지
          <img
            src="/image/ui/addProductImg.png"
            className="w-[282px] h-[282px]  mt-[16px]"
            onClick={handleImageUpload}
          />
        </div>

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
