"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        id="hero"
        className="h-[60vh] md:h-[90vh] lg:h-[540px] bg-[#cfe5ff] bg-no-repeat bg-bottom bg-[length:130%] md:bg-[length:120%] lg:bg-[length:55%] lg:bg-[position:80%_bottom] text-white text-center lg:text-left flex items-center px-4"
        style={{ backgroundImage: "url(/img_home/hero-image.png)" }}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="font-bold text-[32px] leading-[44.8px] pt-12 pb-[18px] md:text-[40px] md:leading-[56px] md:pt-[84px] md:pb-6 lg:pt-0 lg:pb-8">
            일상의 모든 물건을
            <br className="hidden md:hidden lg:inline" />
            거래해 보세요
          </h1>
          <Link
            href="/items"
            id="loginLink"
            className="text-[16px] font-semibold rounded-lg px-[23px] py-[11.5px] bg-blue-500 hover:bg-blue-600 inline-block text-white"
          >
            구경하러 가기
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="flex flex-col items-center gap-[64px] pt-[51px] md:pt-6 md:pb-4 md:gap-[80px] lg:py-[138px] lg:gap-[138px]"
      >
        {/* Feature 1 */}
        <div className="feature w-[90%] flex flex-col items-end text-right text-center md:flex-col md:items-center md:text-center lg:flex-row lg:text-left lg:items-center lg:justify-center lg:gap-[5%] lg:w-[80%]">
          <Image
            src="/img_home/feature1-image.png"
            alt="인기 상품"
            width={500}
            height={500}
            className="w-full lg:w-1/2 max-w-[500px]"
          />
          <div className="feature-content max-w-[400px] mt-5">
            <h2 className="text-[16px] md:text-[18px] leading-[22.4px] font-bold text-blue-500 mb-2 md:mb-3">
              Hot item
            </h2>
            <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[33.6px] md:leading-[44.8px] lg:leading-[56px]">
              인기 상품을 확인해 보세요
            </h1>
            <p className="feature-description font-medium text-[16px] md:text-[18px] lg:text-[24px] text-gray-600 leading-[19.2px] md:leading-[21.6px] lg:leading-[28.8px] tracking-[0.08em] mt-5 lg:mt-6">
              가장 HOT한 중고거래 물품을 판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="feature w-[90%] flex flex-col items-start text-left text-center md:flex-col md:items-center md:text-center lg:flex-row-reverse lg:text-left lg:items-center lg:justify-center lg:gap-[5%] lg:w-[80%]">
          <Image
            src="/img_home/feature2-image.png"
            alt="검색 기능"
            width={500}
            height={500}
            className="w-full lg:w-1/2 max-w-[500px]"
          />
          <div className="feature-content max-w-[400px] mt-5">
            <h2 className="text-[16px] md:text-[18px] leading-[22.4px] font-bold text-blue-500 mb-2 md:mb-3">
              Search
            </h2>
            <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[33.6px] md:leading-[44.8px] lg:leading-[56px]">
              구매를 원하는 상품을 검색하세요
            </h1>
            <p className="feature-description font-medium text-[16px] md:text-[18px] lg:text-[24px] text-gray-600 leading-[19.2px] md:leading-[21.6px] lg:leading-[28.8px] tracking-[0.08em] mt-5 lg:mt-6">
              구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="feature w-[90%] flex flex-col items-end text-right text-center md:flex-col md:items-center md:text-center lg:flex-row lg:text-left lg:items-center lg:justify-center lg:gap-[5%] lg:w-[80%]">
          <Image
            src="/img_home/feature3-image.png"
            alt="판매 상품 등록"
            width={500}
            height={500}
            className="w-full lg:w-1/2 max-w-[500px]"
          />
          <div className="feature-content max-w-[400px] mt-5">
            <h2 className="text-[16px] md:text-[18px] leading-[22.4px] font-bold text-blue-500 mb-2 md:mb-3">
              Register
            </h2>
            <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-[33.6px] md:leading-[44.8px] lg:leading-[56px]">
              판매를 원하는 상품을 등록하세요
            </h1>
            <p className="feature-description font-medium text-[16px] md:text-[18px] lg:text-[24px] text-gray-600 leading-[19.2px] md:leading-[21.6px] lg:leading-[28.8px] tracking-[0.08em] mt-5 lg:mt-6">
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section
        id="bottomBanner"
        className="h-[60vh] md:h-[90vh] lg:h-[540px] bg-[#cfe5ff] bg-no-repeat bg-bottom bg-[length:130%] md:bg-[length:120%] lg:bg-[length:55%] lg:bg-[position:80%_bottom] text-white text-center flex items-center px-4"
        style={{ backgroundImage: "url(/img_home/bottom-banner-image.png)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold leading-relaxed">
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </div>
  );
}
