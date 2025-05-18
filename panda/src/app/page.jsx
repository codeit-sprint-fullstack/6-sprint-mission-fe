"use client";

import HomeHeader from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import "@/components/Button.scss";
import "@/components/css/homepage.scss";

import homeTop from "@/assets/home_top.png";
import home1 from "@/assets/home1.png";
import home2 from "@/assets/home2.png";
import home3 from "@/assets/home3.png";
import homeBottom from "@/assets/home_bottom.png";

export default function HomePage() {
  return (
    <>
      <HomeHeader />

      <main>
        {/* header banner */}
        <section className="bg-[#cfe5ff] h-[540px] md:h-[771px] lg:h-[540px] lg:px-[200px] flex items-end justify-center">
          <div className="flex flex-col lg:flex-row gap-[7px] h-full lg:h-[340px] w-full lg:w-[1110px] justify-between lg:justify-center">
            <div className="self-center justify-items-center lg:w-[357px] mt-[48px] md:mt-[84px] lg:mt-0">
              <h2 className="homeTitle mb-[32px] text-center lg:text-left">
                일상의 모든 물건을&nbsp;
                <br className="md:hidden lg:block" />
                거래해 보세요.
              </h2>
              <Link href="/items">
                <Button size="home" rounded>
                  구경하러 가기
                </Button>
              </Link>
            </div>
            <figure className="w-full lg:max-w-[746px] relative h-[204px] md:h-[340px] self-center">
              <Image src={homeTop} alt="홈페이지 top 이미지" fill />
            </figure>
          </div>
        </section>

        {/* 진짜 body */}
        <section className="p-[32px] w-full mb-[40px] md:mb-[52px] lg:mb-[64px] flex flex-col gap-[40px] lg:gap-[140px] lg:mt-[140px]">
          {/* 1 */}
          <article className="articleForm">
            <figure className="image">
              <Image src={home1} alt="home1" fill />
            </figure>
            <div className="flex flex-col gap-[16px] md:gap-[24px] justify-center">
              <p className="logo">Hot item</p>
              <h3 className="homeTitle2">
                인기 상품을&nbsp;
                <br className="hidden lg:block" /> 확인해 보세요
              </h3>
              <p className="homeText">
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </article>
          {/* 2 */}
          <article className="articleForm">
            <figure className="image">
              <Image src={home2} alt="home2" fill />
            </figure>
            <div className="flex flex-col gap-[16px] md:gap-[24px] justify-center">
              <p className="logo">Search</p>
              <h3 className="homeTitle2">
                구매를 원하는&nbsp;
                <br className="hidden lg:block" /> 상품을 검색하세요
              </h3>
              <p className="homeText">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </article>
          {/* 3 */}
          <article className="articleForm">
            <figure className="image">
              <Image src={home3} alt="home3" fill />
            </figure>
            <div className="flex flex-col gap-[16px] md:gap-[24px] justify-center">
              <p className="logo">Register</p>
              <h3 className="homeTitle2">
                판매를 원하는&nbsp;
                <br className="hidden lg:block" /> 상품을 등록하세요
              </h3>
              <p className="homeText">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </article>
        </section>

        <div className="hidden lg:block bg-gray-50 h-[100px]"></div>

        {/* footer banner */}
        <section className="bg-[#cfe5ff] h-[540px] md:h-[927px] lg:h-[540px] flex flex-col justify-between lg:flex-row lg:items-end lg:justify-center">
          <div className="flex grow items-center justify-center lg:self-center lg:h-[400px] relative lg:bottom-[-80px] lg:grow-0">
            <h2 className="homeTitle text-center lg:text-left">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h2>
          </div>
          <figure className="w-full lg:max-w-[746px] relative h-[204px] md:h-[340px]">
            <Image src={homeBottom} alt="home3" fill />
          </figure>
        </section>
      </main>

      <Footer />
    </>
  );
}
