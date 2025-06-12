"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function Banner({ isTop }) {
  return (
    <div
      className={`flex flex-col justify-between items-center h-[540px] md:h-[771px] lg:h-[540px] bg-[#CFE5FF] ${
        isTop ? "mb-[52px]" : "mt-[83px]"
      } lg:flex-row lg:justify-center lg:items-end`}
    >
      {isTop ? (
        <>
          <div className="space-y-[18px] lg:mb-25">
            <h1 className="text-[32px] lg:text-[40px] font-bold text-center mt-12 md:mt-21 lg:text-left">
              일상의 모든 물건을&nbsp;
              <span className="h-0 block md:hidden lg:block"></span>
              거래해 보세요
            </h1>
            <Link href="/items" className="flex justify-center">
              <button className="btn-base rounded-[40px] text-lg px-[71px] h-12 md:h-14 md:text-xl md:py-4 md:px-[124px]">
                구경하러 가기
              </button>
            </Link>
          </div>
          <Image
            src="/assets/img/home_top.svg"
            alt="상단 배너"
            width={448}
            height={204}
            className="md:w-[744px] lg:w-[746px] lg:h-[340px]"
          />
        </>
      ) : (
        <>
          <h1 className="text-[32px] lg:text-[40px] font-bold text-center mt-12 md:mt-21 lg:text-left lg:mb-[172px]">
            믿을 수 있는 <br /> 판다마켓 중고 거래
          </h1>
          <Image
            src="/assets/img/home_bottom.svg"
            alt="하단 배너"
            width={448}
            height={204}
            className="md:w-[744px] lg:w-[746px] lg:h-[340px]"
          />
        </>
      )}
    </div>
  );
}

export default Banner;
