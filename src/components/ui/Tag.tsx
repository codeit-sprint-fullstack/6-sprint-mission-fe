"use client";

import Image from "next/image";
import React, { useState } from "react";

interface TagProps {
  tags: string[];
  setValues: React.Dispatch<React.SetStateAction<{ tags: string[] }>>;
  tagInput: string;
  setTagInput: (value: string) => void;
}

function Tag({ tags, setValues, tagInput, setTagInput }: TagProps) {
  // 입력 상태 감지(IME 이슈)
  const [isComposing, setIsComposing] = useState(false);

  const removeTag = (tagIndex: number) => {
    const newTags = tags.filter((_, index) => index !== tagIndex);
    setValues((prev: { tags: string[] }) => ({ ...prev, tags: newTags }));
  };

  const addTag = () => {
    if (
      tagInput.trim() !== "" &&
      !tags.includes(tagInput.trim()) &&
      !tags.includes(`#${tagInput.trim()}`)
    ) {
      setValues((prev: { tags: string[] }) => ({
        ...prev,
        tags: [...prev.tags, `#${tagInput.trim()}`],
      }));
      setTagInput("");
    }
  };

  const handleKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return; // isComposing 상태면 return하여 함수 종료
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <input
        className="w-full rounded-xl bg-gray-100 px-6 py-4 font-normal"
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
      <ul className="mt-[14px] flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex h-9 items-center justify-center gap-2 rounded-[26px] bg-gray-100 py-[6px] pr-3 pl-4"
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
