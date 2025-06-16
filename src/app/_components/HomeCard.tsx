"use client";

import Image from "next/image";

export default function HomeCard({
  id,
  title,
  text,
  subtext,
  imgSrc,
  imgAlt,
  reverse,
}: {
  id: number;
  title: string;
  text: string;
  subtext: string[];
  imgSrc: string;
  imgAlt: string;
  reverse: boolean;
}) {
  return (
    <section
      key={id}
      className="flex h-auto w-full items-center justify-center px-5 py-[50px] md:py-[150px]"
    >
      <div
        className={`flex w-full flex-col items-center justify-center gap-5 md:h-[500px] md:w-[1000px] md:gap-0 md:bg-[#fcfcfc] ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
      >
        <div className="h-full w-full">
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={500}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className={`flex w-full flex-col gap-5 md:w-[500px] md:p-5 ${reverse ? "md:text-right" : ""}`}
        >
          <span className="text-[1.4rem] font-bold text-blue-500">{title}</span>

          <span className="text-[2rem] leading-[1.3] font-bold text-gray-800">
            {text}
          </span>

          <span className="w-full text-[1.4rem] leading-[1.3] text-gray-800">
            {subtext.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
