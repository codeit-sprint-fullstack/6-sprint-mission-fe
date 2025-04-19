"use client";

import Images from "@/components/ui/Images";
import React, { useState } from "react";

function DetailArticle() {
  const [isGnbActive, setIsGnbActive] = useState(false);
  return (
    <section className="max-w-[375px] m-auto mb-[319px] pt-[24px] px-[16px] xs:max-w-[744px] xs:pt-[26px] xs:px-[24px] m:max-w-[1200px]">
      <article className="flex flex-col gap-[16px] mb-[16px] pb-[16px] border-b border-[#E5E7EB]">
        <div className="relative flex justify-between">
          <p className="w-[312px] text-[20px] font-[700] text-[#1F2937] xs:w-[664px] m:text-[18px]">
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </p>
          <span
            className="cursor-pointer"
            onClick={() => setIsGnbActive((prev) => !prev)}
          >
            <Images
              src={"/kebab.png"}
              w={"w-[24px]"}
              h={"h-[24px]"}
              alt={"kebab"}
            />
          </span>
          <ul
            className={`${
              isGnbActive ? "block" : "hidden"
            } absolute top-[24px] right-[4px] w-[102px] h-[90px] rounded-[8px] border border-[#D1D5DB]`}
          >
            <li className="h-[50%] text-center leading-[45px] text-[14px] text-[#6B7280] border-b border-[#D1D5DB]">
              수정하기
            </li>
            <li className="h-[50%] text-center leading-[45px] text-[14px] text-[#6B7280]">
              삭제하기
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-[16px]">
          <Images
            src={"/profile.png"}
            w={"w-[40px]"}
            h={"h-[40px]"}
            alt={"profile"}
          />
          <div className="flex items-center gap-[2px]">
            <p className="text-[14px] font-[500] text-[#4B5563]">총명한 판다</p>
            <p className="text-[14px] font-[400] text-[#9CA3AF]">2024.01.02</p>
          </div>
          <div className="flex gap-[4px] border-l border-[#E5E7EB] pl-[32px]">
            <span className="flex items-center  py-[4px] px-[12px] border border-[#E5E7EB] rounded-[35px]">
              <Images
                src={"/heart.png"}
                w={"w-[32px]"}
                h={"h-[32px]"}
                alt={"heart"}
              />
              <p className="text-[14px] font-[500] text-[#6B7280]">1234</p>
            </span>
          </div>
        </div>
      </article>
      <p className="text-[#1F2937] mb-[32px]">
        맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
      </p>
      <article className="mb-[24px]">
        <p className="font-[600] text-[#111827] mb-[8px]">댓글달기</p>
        <textarea
          className="w-full h-[104px] bg-[#F3F4F6] px-[24px] pt-[16px] rounded-[12px] mb-[16px] resize-none"
          placeholder="댓글을 입력해주세요"
        />
        <div className="w-full flex justify-end">
          <button className="bg-[var(--color-main-blue)] w-[74px] h-[42px] text-white font-[600] rounded-[8px] cursor-pointer">
            등록
          </button>
        </div>
      </article>
      <div className="flex flex-col gap-[24px] pb-[8px] border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-[#1F2937]">
            혹시 사용긴간이 어떻게 되실까요?
          </p>
          <Images
            src={"/kebab.png"}
            w={"w-[24px]"}
            h={"h-[24px]"}
            alt={"kebab"}
          />
        </div>
        <div className="flex items-center gap-[8px]">
          <Images
            src={"/profile.png"}
            w={"w-[32px]"}
            h={"h-[32px]"}
            alt={"heart"}
          />
          <div>
            <p className="text-[12px] text-[#4B5563]">똑똑한 판다</p>
            <p className="text-[12px] text-[#9CA3AF]">1시간 전</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailArticle;
