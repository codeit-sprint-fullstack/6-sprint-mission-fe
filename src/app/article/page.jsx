import React from "react";
import BestArticle from "./_components/BestArticle";
import Link from "next/link";
import Image from "next/image";
import { getArticle } from "@/lib/api/articleApi";

export default async function Article() {
  const articles = await getArticle();
  console.log(articles);
  return (
    <section className="m-[16px] m:m-[24px ]">
      <div className="max-w-[343px] m-auto web:max-w-[696px] pc:max-w-[1200px]">
        <article className=" mb-[24px]">
          <p className="text-[18px] font-[700] mb-[16px]">베스트 게시글</p>
          <BestArticle />
        </article>
      </div>
      <article className="max-w-[375px] m-auto mb-[90px] xs:max-w-[744px] xs:mb-[20px] m:max-w-[1200px] m:mb-[290px]">
        <div className="flex items-center justify-between mb-[16px]">
          <p className="text-[18px] font-[700]">게시글</p>
          <Link
            className="block w-[88px] h-[42px] leading-[42px] text-center text-white rounded-[8px] bg-[var(--color-main-blue)]"
            href="/post"
          >
            글쓰기
          </Link>
        </div>
        <div className="flex items-center gap-[13px] mb-[16px] xs:gap-[6px] xs:mb-[40px] m:gap-[16px] m:mb-[24px]">
          <div className="relative w-full">
            <figure className="absolute top-[50%] translate-y-[-50%] left-[16px] w-[24px] h-[24px]">
              <Image
                className="object-cover"
                src="/search.png"
                alt="search"
                fill
              />
            </figure>
            <input
              className="w-full h-[42px] bg-[#F3F4F6] rounded-[12px] pl-[44px] outline-none"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <select
            className="w-[42px] h-[42px] xs:w-[130px] border border-[#E5E7EB] rounded-[12px] outline-none"
            name=""
            id=""
          >
            <option value="recent">최신순</option>
            <option value="best">좋아요 순</option>
          </select>
        </div>
        <div className="flex flex-col gap-[24px] bg-[#FCFCFC]">
          <div className="w-full h-[136px] border-b border-b-[#E5E7EB]">
            <div className="flex items-center justify-between gap-[8px] mb-[16px]">
              <p className="text-[18px] font-[600] w-[263px] xs:text-[20px] xs:w-full ">
                맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
              </p>
              <figure className="relative w-[72px] h-[72px] shrink-0">
                <Image
                  className="object-cover"
                  src="/laptop.png"
                  alt="laptop"
                  fill
                />
              </figure>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/profile.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[14px] text-[#4B5563]">총명한 판다</p>
                <p className="text-[14px] text-[#9CA3AF]">2024. 04. 16</p>
              </div>
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/heart.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[#6B7280]">9999+</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[136px] border-b border-b-[#E5E7EB]">
            <div className="flex items-center justify-between gap-[8px] mb-[16px]">
              <p className="text-[18px] font-[600] w-[263px] xs:text-[20px] xs:w-full ">
                맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
              </p>
              <figure className="relative w-[72px] h-[72px] shrink-0">
                <Image
                  className="object-cover"
                  src="/laptop.png"
                  alt="laptop"
                  fill
                />
              </figure>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/profile.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[14px] text-[#4B5563]">총명한 판다</p>
                <p className="text-[14px] text-[#9CA3AF]">2024. 04. 16</p>
              </div>
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/heart.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[#6B7280]">9999+</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[136px] border-b border-b-[#E5E7EB]">
            <div className="flex items-center justify-between gap-[8px] mb-[16px]">
              <p className="text-[18px] font-[600] w-[263px] xs:text-[20px] xs:w-full ">
                맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
              </p>
              <figure className="relative w-[72px] h-[72px] shrink-0">
                <Image
                  className="object-cover"
                  src="/laptop.png"
                  alt="laptop"
                  fill
                />
              </figure>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/profile.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[14px] text-[#4B5563]">총명한 판다</p>
                <p className="text-[14px] text-[#9CA3AF]">2024. 04. 16</p>
              </div>
              <div className="flex items-center gap-[8px]">
                <figure className="relative w-[24px] h-[24px]">
                  <Image
                    className="object-cover"
                    src="/heart.png"
                    alt="laptop"
                    fill
                  />
                </figure>
                <p className="text-[#6B7280]">9999+</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
