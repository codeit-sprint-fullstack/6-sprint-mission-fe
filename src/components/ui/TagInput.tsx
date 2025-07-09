"use client";

import React, { KeyboardEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "@/components/ui/Input";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  error?: string;
}

function TagInput({
  tags,
  onAddTag,
  onRemoveTag,
  error: externalError,
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const onPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const inputString = input.trim();
    if (event.key === "Enter" && inputString && !error) {
      event.preventDefault();
      onAddTag(inputString);
      setInput("");
    }
  };

  const validateTag = (newTag: string) => {
    if (newTag.length > 5) {
      setError("태그는 5글자 이내로 입력해주세요.");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full">
      <Input
        label="태그"
        name="tag"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          validateTag(e.target.value);
        }}
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해 주세요"
        error={error || externalError} // 외부 에러도 반영
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <div
              key={`tag-${tag}`}
              className="flex items-center bg-gray-200 text-black px-3 py-2 rounded-full text-sm"
            >
              <span className="mr-2 truncate max-w-[100px]">{tag}</span>
              <button
                onClick={() => onRemoveTag(tag)}
                className="text-gray-600 hover:text-red-500"
                aria-label={`${tag} 태그 삭제`}
              >
                <AiOutlineClose size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagInput;
