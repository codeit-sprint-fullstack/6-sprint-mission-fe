import React from "react";
import ReportingDate from "@/components/text/Date.jsx";
import { UserName } from "@/components/text/text.jsx";

function AuthorInfo({ nickname, createdAt }) {
  return (
    <div className="flex gap-[16px]">
      <img
        src="/assets/default_img.svg"
        alt="기본 프로필 사진"
        className="w-[40px] h-[40px]"
      />
      <div className="flex flex-col gap-[2px] justify-center">
        <UserName>{nickname}</UserName>
        <ReportingDate createdAt={createdAt} />
      </div>
    </div>
  );
}

export default AuthorInfo;
