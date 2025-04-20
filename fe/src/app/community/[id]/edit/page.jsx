"use client";

import InputBox from "@/components/ui/InputBox";
import TitleSection from "@/components/ui/TitleSection";
import { updateArticle } from "@/lib/services/api/article";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function communityEditPage() {
  const router = useRouter();
  const [titleValueState, setTitleValueState] = useState("");
  const [contentValueState, setContentValueState] = useState("");
  const isActive = titleValueState !== "" && contentValueState !== "";
  const { articleId } = useParams();

  const handleCreateArticle = async () => {
    const submitData = { title: titleValueState, content: contentValueState };

    const response = await updateArticle(articleId, submitData);
    if (response.status === 200) {
      const result = await response.json();
      router.push(`/articles/${result.id}`);
    }
  };

  return (
    <>
      <TitleSection
        titleText={"상품 수정하기"}
        buttonStyle={
          <button
            className={`btn-sm-42 ${
              isActive
                ? "bg-primary-100 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isActive}
            onClick={handleCreateArticle}
          >
            등록
          </button>
        }
      />
      <TitleSection titleText={"*제목"} />
      <div className="h-[54px]">
        <InputBox
          placeHolderText={"제목을 입력해주세요"}
          inputValueState={titleValueState}
          setInputValueState={setTitleValueState}
        />
      </div>

      <TitleSection titleText={"*내용"} />
      <div className="h-[282px]">
        <InputBox
          placeHolderText={"내용을 입력해주세요"}
          inputValueState={contentValueState}
          setInputValueState={setContentValueState}
          inputType={"textarea"}
        />
      </div>
    </>
  );
}
