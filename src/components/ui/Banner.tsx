"use client";

import { BottomBanner, TopBanner } from "@/assets/svgs";
import Link from "next/link";
import React from "react";

interface BannerProps {
  isTop?: boolean;
}

function Banner({ isTop }: BannerProps) {
  return (
    <div
      className={`flex h-fit max-h-[540px] flex-col items-center justify-between bg-[#CFE5FF] md:h-[771px] lg:h-[540px] ${
        isTop ? "mb-[52px]" : "mt-[83px]"
      } lg:flex-row lg:items-end lg:justify-center`}
    >
      {isTop ? (
        <>
          <div className="space-y-[18px] lg:mb-25">
            <h1 className="mt-12 text-center text-[32px] font-bold md:mt-21 lg:text-left lg:text-[40px]">
              일상의 모든 물건을&nbsp;
              <span className="block h-0 md:hidden lg:block"></span>
              거래해 보세요
            </h1>
            <Link href="/items" className="flex justify-center">
              <button className="btn-base h-12 rounded-[40px] px-[71px] text-lg md:h-14 md:px-[124px] md:py-4 md:text-xl">
                구경하러 가기
              </button>
            </Link>
          </div>
          <TopBanner
            aria-label="상단 배너"
            className="mt-33 md:w-[744px] lg:h-[340px] lg:w-[746px]"
          />
        </>
      ) : (
        <>
          <h1 className="mt-12 text-center text-[32px] font-bold md:mt-21 lg:mb-[172px] lg:text-left lg:text-[40px]">
            믿을 수 있는 <br /> 판다마켓 중고 거래
          </h1>
          <BottomBanner
            aria-label="하단 배너"
            className="mt-[131px] md:w-[744px] lg:h-[340px] lg:w-[746px]"
          />
        </>
      )}
    </div>
  );
}

export default Banner;
