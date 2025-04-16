import React from "react";

export default function page() {
  return (
    <section className="max-w-[375px] m-auto pt-[16px] px-[15px]">
      <form action="">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-[700]">상품 등록하기</p>
          <button
            disabled
            className="bg-[var(--color-main-blue)] w-[74px] h-[42px] text-white font-[600] rounded-[8px] cursor-pointer"
          >
            등록
          </button>
        </div>
        <div>
          <label>
            <p>*제목</p>
            <input type="text" />
          </label>
          <label>
            <p>*내용</p>
            <textarea type="text" />
          </label>
        </div>
      </form>
    </section>
  );
}
