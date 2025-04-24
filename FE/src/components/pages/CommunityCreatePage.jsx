"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/services/api/article";
import InputBox from "@/components/ui/InputBox";
import TitleSection from "@/components/ui/TitleSection";

export default function CommunityCreatePage() {
  const router = useRouter();
  const [titleValueState, setTitleValueState] = useState("");
  const [contentValueState, setContentValueState] = useState("");
  const isActive = titleValueState !== "" && contentValueState !== "";

  const handleCreateArticle = async () => {
    const submitData = { title: titleValueState, content: contentValueState };

    const response = await createArticle(submitData);
    if (response.status === 200) {
      const result = await response.json();
      router.push(`/articles/${result.id}`);
    }
  };

  return (
    <>
      <TitleSection
        titleText={"게시글 쓰기"}
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
