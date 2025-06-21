"use client";
import { postComment } from "@/lib/api/comment";
import { TItem } from "@/types";
import React, { useState } from "react";

interface QuestionFormProps {
  itemId: TItem["id"];
}

function QuestionForm({ itemId }: QuestionFormProps) {
  const [content, setContent] = useState("");
  const handleClick = async () => {
    const newQuestion = await postComment("item", itemId, { content });
    if (newQuestion) {
      window.location.reload();
    }
  };
  const isValid = content.trim() !== "";
  return (
    <div className="mt-8 w-full">
      <p className="text-gray-800 text-sm font-semibold">문의하기</p>
      <textarea
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다. "
        className="bg-gray-100 w-full h-26 rounded-xl px-6 pt-4 mt-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex justify-end mt-4">
        <button
          className={`${
            !isValid ? "bg-gray-400" : "bg-primary-100"
          } text-white w-18.5 h-10.5 rounded-xl`}
          disabled={!isValid}
          onClick={handleClick}
        >
          등록
        </button>
      </div>
    </div>
  );
}

export default QuestionForm;
