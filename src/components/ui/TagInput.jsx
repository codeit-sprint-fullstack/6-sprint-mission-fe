"use client";
import React, { useState } from "react";
import InputItem from "./InputItem";

export default function TagInput({ tags, onAddTag, onRemoveTag }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const validateTag = (value) => {
    if (value.length < 1 || value.length > 10) {
      setError("태그는 1자 이상 10자 이하여야 합니다.");
    } else {
      setError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!error && input.trim()) {
        onAddTag(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div>
      <InputItem
        id="tags"
        label="태그"
        value={input}
        placeholder="태그를 입력해 주세요"
        onChange={(e) => {
          setInput(e.target.value);
          validateTag(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        error={error}
      />

      {tags.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <div
              key={`tag-${tag}`}
              className="inline-flex items-center bg-secondary-100 text-secondary-800 rounded-full py-3 px-4 min-w-[100px]"
            >
              <span className="text-sm truncate mr-2">{tag}</span>
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                aria-label={`Remove tag ${tag}`}
                className="focus:outline-none text-secondary-400 hover:text-secondary-800"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
