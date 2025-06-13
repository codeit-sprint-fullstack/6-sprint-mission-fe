"use client";

import { RemoveIcon } from "@/assets/svgs";
import React, { useState } from "react";

interface TagProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
}

function Tag({ tags, setTags, tagInput, setTagInput }: TagProps) {
  // 입력 상태 감지(IME 이슈)
  const [isComposing, setIsComposing] = useState(false);

  const addTag = () => {
    if (
      tagInput.trim() !== "" &&
      !tags.includes(tagInput.trim()) &&
      !tags.includes(`#${tagInput.trim()}`)
    ) {
      setTags((prev) => [...prev, `#${tagInput.trim()}`]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
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
            <RemoveIcon
              aria-label="태그 삭제"
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
