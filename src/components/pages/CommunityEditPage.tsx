"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InputBox from "@/components/ui/InputBox";
import TitleSection from "@/components/ui/TitleSection";
import { articleService, EditArticle } from "@/lib/services/api/articleService";

export default function CommunityEditPage() {
  const router = useRouter();
  const [titleValueState, setTitleValueState] = useState<string>("");
  const [contentValueState, setContentValueState] = useState<string>("");
  const isActive = titleValueState !== "" && contentValueState !== "";
  const { articleId } = useParams<{ articleId: string }>();

  const handleCreateArticle = async () => {
    if (!articleId) return;
    const submitData: EditArticle = { title: titleValueState, content: contentValueState, images: [] };
    const response = await articleService.updateArticle(articleId, submitData);
    if (response && response.id) {
      router.push(`/articles/${response.id}`);
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
          onChangeInput={(e) => setTitleValueState(e.target.value)}
        />
      </div>

      <TitleSection titleText={"*내용"} />
      <div className="h-[282px]">
        <InputBox
          placeHolderText={"내용을 입력해주세요"}
          inputValueState={contentValueState}
          onChangeInput={(e) => setContentValueState(e.target.value)}
          inputType={"textarea"}
        />
      </div>
    </>
  );
}
