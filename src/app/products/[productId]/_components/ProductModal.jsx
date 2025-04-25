import React from "react";
import Image from "next/image";
import ic_check from "@/assets/images/common/ic_check.svg";

export default function ProductModal() {
  return (
    <div className="fixed z-3 top-0 right-0 bottom-0 left-0 min-w-screen min-h-screen">
      <div className="absolute top-[50%] left-[50%] translate-[-50%] flex flex-col justify-center items-center w-[298px] h-[202px] rounded-[12px] gap-[32px] bg-white shadow-2xl">
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-error-red">
            <div className="relative w-[12px] h-[12px]">
              <Image src={ic_check} alt="체크" fill className="object-cover" />
            </div>
          </div>
          <p className="font-medium text-[16px]/[26px]">
            정말로 상품을 삭제하시겠어요?
          </p>
        </div>
        <div className="flex justify-center items-center gap-[8px]">
          <button className="flex justify-center items-center rounded-[8px] w-[88px] h-[48px] py-[12px] px-[23px] font-semibold text-[16px]/[26px] cursor-pointer text-error-red border-[1px] bg-white">
            취소
          </button>
          <button className="flex justify-center items-center rounded-[8px] w-[88px] h-[48px] py-[12px] px-[23px] font-semibold text-[16px]/[26px] cursor-pointer text-white bg-error-red">
            네
          </button>
        </div>
      </div>
    </div>
  );
}
