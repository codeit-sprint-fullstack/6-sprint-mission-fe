"use client";

import React from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/posting/InputField";

function PostingPage() {
  const handlePost = () => {
    console.log("posting is Done");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="pt-[94px] flex flex-col w-[1200px]">
        <div className="flex flex-row justify-between mb-[32px]">
          <div className="font-pretendard font-bold text-[20px]">
            게시글 쓰기
          </div>
          <Button
            text={"등록"}
            onClick={handlePost}
            disabled={true}
            width={"w-[74px]"}
            height={"h-[42px]"}
          />
        </div>

        <div className="mb-[24px]">
          <div className="font-pretendard font-bold text-[20px] mb-[12px]">
            * 제목
          </div>
          <InputField placeholder={"제목을 입력해주세요"} height={"h-[56px]"} />
        </div>
        <div>
          <div className="font-pretendard font-bold text-[20px] mb-[12px]">
            * 내용
          </div>
          <InputField
            placeholder={"내용을 입력해주세요"}
            height={"h-[282px]"}
          />
        </div>
      </div>
    </div>
  );
}

export default PostingPage;
