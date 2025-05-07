"use client";

import React from "react";

const ItemTextarea = ({ state, setState }) => {
  return (
    <div>
      <p className="text-[18px] font-[700] text-[#1f2937] mb-[16px]">
        상품 소개
      </p>
      <textarea
        placeholder="상품 소개를 입력해주세요"
        className="w-full h-[282px] rounded-[12px] bg-[#f3f4f6] outline-none px-[24px] pt-[16px] resize-none"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default ItemTextarea;
