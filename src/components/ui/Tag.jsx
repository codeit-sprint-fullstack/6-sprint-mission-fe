"use client";

import Image from "next/image";
import React, { useState } from "react";

function Tag({ tags, setValues, tagInput, setTagInput }) {
  // 입력 상태 감지(IME 이슈)
  const [isComposing, setIsComposing] = useState(false);

  const removeTag = (tagIndex) => {
    const newTags = tags.filter((_, index) => index !== tagIndex);
    setValues((prev) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    if (
      tagInput.trim() !== "" &&
      !tags.includes(tagInput.trim()) &&
      !tags.includes(`#${tagInput.trim()}`)
    ) {
      setValues((prev) => ({
        ...prev,
        tags: [...prev.tags, `#${tagInput.trim()}`],
      }));
      setTagInput("");
    }
  };

  const handleKeyPressEnter = (e) => {
    if (isComposing) return; // isComposing 상태면 return하여 함수 종료
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <input
        className="w-full px-6 py-4 rounded-xl bg-gray-100 font-normal"
        type="text"
        placeholder="태그를 입력해주세요"
        value={tagInput || ""}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          handleKeyPressEnter(e);
        }}
      />
      <ul className="flex mt-[14px] gap-3 flex-wrap">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex justify-center items-center h-9 gap-2 py-[6px] pr-3 pl-4 bg-gray-100 rounded-[26px]"
          >
            <span>{tag}</span>
            <Image
              src="/assets/icon/ic_X.svg"
              alt="태그 삭제"
              width={22}
              height={24}
              onClick={() => removeTag(index)}
              className="cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tag;
