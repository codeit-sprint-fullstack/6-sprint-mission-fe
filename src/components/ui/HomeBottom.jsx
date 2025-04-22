"use client";

import Image from "next/image";

export default function HomeBottom() {
  return (
    <section className="flex w-full items-end justify-center bg-[#cfe5ff] md:h-[500px]">
      <div className="flex flex-col items-center text-center md:w-[1200px] md:flex-row">
        <div className="my-[150px] w-[80%] font-['Pretendard'] text-[2.5rem] leading-[1.4] font-bold text-gray-800 md:w-[500px] md:text-left">
          <p>믿을 수 있는</p>
          <p>판다마켓 중고 거래</p>
        </div>
        <div className="w-full">
          <Image
            src="/img/Img_home_bottom.png"
            alt="배너 이미지"
            width={700}
            height={500}
            className="h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
