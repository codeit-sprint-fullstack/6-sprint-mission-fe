import React from "react";
import { TiDelete } from "react-icons/ti";
import { TagInputProps } from "@/types/form";

export default function TagInput({
  tags,
  inputTag,
  tagError,
  tagLengthError,
  onTagInput,
  onAddTag,
  onDeleteTag,
  inputRef,
}: TagInputProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="mb-2.5 text-lg font-bold">태그</span>
      <input
        className={`h-14 w-full rounded-xl border-none bg-[#f3f4f6] p-5 text-[#1f2937] focus:outline-none ${
          tagError || tagLengthError ? "border border-[#f74747]" : ""
        }`}
        type="text"
        value={inputTag}
        ref={inputRef}
        placeholder="태그를 입력후 엔터를 눌러주세요!"
        onChange={onTagInput}
        onKeyDown={onAddTag}
      />

      {/* 에러 메시지 */}
      {tagLengthError && (
        <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
          5글자 이내로 입력해주세요
        </span>
      )}
      {tagError && (
        <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
          태그를 1개 이상 입력해주세요
        </span>
      )}

      {/* 태그 목록 */}
      {tags && tags.length > 0 && (
        <ul className="flex w-full flex-wrap gap-2.5">
          {tags.map((tag: string, index: number) => (
            <li
              key={index}
              className="flex items-center gap-2.5 rounded-3xl bg-[#f3f4f6] px-2.5 py-1.5"
            >
              <span className="ml-1 text-base text-[#1f2937]">#{tag}</span>
              <TiDelete
                className="h-[35px] w-[35px] cursor-pointer text-[#9ca3af]"
                onClick={(e) => onDeleteTag(e, tag)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
