"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputBox from "@/components/ui/InputBox";
import TitleSection from "@/components/ui/TitleSection";
import { articleService } from "@/lib/services/api/articleService";

export default function CommunityCreatePage() {
  const router = useRouter();
  const [titleValueState, setTitleValueState] = useState("");
  const [contentValueState, setContentValueState] = useState("");
  const isActive = titleValueState !== "" && contentValueState !== "";

  const handleCreateArticle = async () => {
    const submitData = { title: titleValueState, content: contentValueState };

    const response = await articleService.createArticle(submitData);
    if (response.status === 200) {
      const result = await response.json();
      router.push(`/articles/${result.id}`);
    }
  };

  return (
    <>
      <section className="p-4">
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
      </section>
      <section className="p-4">
        <TitleSection titleText={"*제목"} />
        <div>
          <InputBox
            placeHolderText={"제목을 입력해주세요"}
            inputValueState={titleValueState}
            setInputValueState={setTitleValueState}
            inputClassName="h-[54px]"
          />
        </div>
      </section>
      <section className="p-4">
        <TitleSection titleText={"*내용"} />
        <div>
          <InputBox
            placeHolderText={"내용을 입력해주세요"}
            inputValueState={contentValueState}
            setInputValueState={setContentValueState}
            inputType={"textarea"}
            inputClassName="h-[282px]"
          />
        </div>
      </section>
    </>
  );
}
