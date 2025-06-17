import Image from "next/image";
import Link from "next/link";
import React from "react";
import img_home_top from "@/assets/images/app/img_home_top.svg";
import img_home_01 from "@/assets/images/app/img_home_01.svg";
// import img_home_02 from "@/assets/images/app/img_home_02.svg";
// import img_home_03 from "@/assets/images/app/img_home_03.svg";
// import img_home_bottom from "@/assets/images/app/img_home_bottom.svg";

export default function LandingPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-content items-center gap-[18px]">
          <h1 className="font-bold text-[32px] text-center whitespace-nowrap">
            일상의 모든 물건을
            <br />
            거래해보세요
          </h1>
          <Link
            href="/"
            className="flex justify-center items-center rounded-[40px] w-[240px] h-[48px] bg-primary-100 font-semibold text-[18px]/[26px] text-secondary-gray-50"
          >
            구경하러 가기
          </Link>
        </div>
        <div className="relative w-full max-w-[746px] aspect-[746/340]">
          <Image
            src={img_home_top}
            alt="인기 상품"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <div className="relative w-full max-w-[588px] h-[259px] sm:h-[524px] md:h-[444px] sm:max-w-[696px]">
          <Image
            src={img_home_01}
            alt="인기 상품"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div>
            <p>Hot item</p>
            <h2>인기 상품을 확인해보세요</h2>
          </div>
          <p>가장 HOT한 중고거래 물품을 판다 마켓에서 확인해보세요</p>
        </div>
      </div>
    </div>
  );
}
