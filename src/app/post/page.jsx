import React from "react";

export default function page() {
  return (
    <section className="max-w-[375px] h-[100vh] m-auto pt-[16px] px-[15px] xs:max-w-[744px] xs:px-[24px] m:max-w-[1200px] m:pt-[24px]">
      <form action="">
        <div className="flex items-center justify-between mb-[24px]">
          <p className="text-[20px] font-[700]">상품 등록하기</p>
          <button
            disabled
            className="bg-[var(--color-main-blue)] w-[74px] h-[42px] text-white font-[600] rounded-[8px] cursor-pointer"
          >
            등록
          </button>
        </div>
        <div className="flex flex-col gap-[16px]">
          <label>
            <p className="text-[14px] font-[700] text-[#1F2937] mb-[12px]">
              *제목
            </p>
            <input
              className="w-full h-[56px] bg-[#F3F4F6] rounded-[12px] px-[24px]"
              type="text"
              placeholder="제목을 입력해주세요"
            />
          </label>
          <label>
            <p className="text-[14px] font-[700] text-[#1F2937] mb-[12px]">
              *내용
            </p>
            <textarea
              className="w-full h-[200px] bg-[#F3F4F6] px-[24px] pt-[16px] rounded-[12px] resize-none"
              placeholder="내용을 입력해주세요"
            />
          </label>
        </div>
      </form>
    </section>
  );
}
