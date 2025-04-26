"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function Banner({ isTop }) {
  return (
    <div className="flex flex-col justify-between items-center h-[540px] bg-[#CFE5FF]">
      {isTop ? (
        <>
          <div className="space-y-[18px]">
            <h1 className="text-[32px] font-bold text-center mt-12">
              일상의 모든 물건을 <br /> 거래해 보세요
            </h1>
            <Link href="/items">
              <button className="btn-base rounded-[40px] px-[71px]">
                구경하러 가기
              </button>
            </Link>
          </div>
          <Image
            src="/assets/img/img_home_top.svg"
            alt="상단 배너"
            width={448}
            height={204}
          />
        </>
      ) : (
        <>
          <h1 className="text-[32px] font-bold text-center mt-12">
            믿을 수 있는 <br /> 판다마켓 중고 거래
          </h1>
          <Image
            src="/assets/img/img_home_bottom.svg"
            alt="하단 배너"
            width={448}
            height={204}
          />
        </>
      )}
    </div>
  );
}

export default Banner;
