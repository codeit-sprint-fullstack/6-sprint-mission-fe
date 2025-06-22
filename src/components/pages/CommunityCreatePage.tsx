"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputBox from "@/components/ui/InputBox";
import TitleSection from "@/components/ui/TitleSection";
import { articleService, NewArticle } from "@/lib/services/api/articleService";

export default function CommunityCreatePage() {
  const router = useRouter();
  const [titleValueState, setTitleValueState] = useState<string>("");
  const [contentValueState, setContentValueState] = useState<string>("");
  const isActive = titleValueState !== "" && contentValueState !== "";

  const handleCreateArticle = async () => {
    const submitData: NewArticle = { title: titleValueState, content: contentValueState, images: [] };
    const response = await articleService.createArticle(submitData);
    if (response && response.id) {
      router.push(`/articles/${response.id}`);
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
            onChangeInput={(e) => setTitleValueState(e.target.value)}
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
            onChangeInput={(e) => setContentValueState(e.target.value)}
            inputType={"textarea"}
            inputClassName="h-[282px]"
          />
        </div>
      </section>
    </>
  );
}
