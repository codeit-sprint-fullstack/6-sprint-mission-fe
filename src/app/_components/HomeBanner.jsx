"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomeBanner() {
  return (
    <section className="flex w-full items-center justify-center bg-[#cfe5ff] pt-[70px] md:h-[500px] md:items-end">
      <div className="flex w-full flex-col items-center md:w-[1200px] md:flex-row md:items-end">
        <div className="mb-[150px] flex w-[350px] flex-col items-center gap-5 text-center md:text-left">
          <span className="w-[90%] font-['Pretendard'] text-[2.4rem] leading-[1.4] font-bold text-gray-800">
            일상의 모든 물건을 거래해 보세요
          </span>
          <Link
            href="/items"
            className="flex h-[50px] w-full items-center justify-center rounded-[30px] bg-blue-500 text-[1.2rem] text-white transition-colors duration-200 hover:bg-blue-600"
          >
            구경하러 가기
          </Link>
        </div>

        <div className="w-full md:w-[850px]">
          <figure className="relative h-[500px] w-[850px]">
            <Image
              src="/img/Img_home_top.png"
              alt="배너 이미지"
              sizes="850px"
              priority
              fill
              className="h-full w-full object-contain"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
