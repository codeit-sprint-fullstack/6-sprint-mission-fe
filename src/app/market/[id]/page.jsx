import Tag from "@/components/ui/Tag";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MarketDetail() {
  return (
    <div>
      <div className="w-[1200px]">
        <div>
          <div className="border-b border-gray-200 w-[1190px]">
            <div className="flex gap-[24px] mb-[40px]">
              <Image
                src="/img_default.svg"
                className="rounded-[16px]"
                alt="default"
                width={486}
                height={486}
              />
              <div className="w-[690px]">
                <div>
                  <div className="border-b border-gray-200 mb-[24px]">
                    <div className="flex justify-between items-start mb-[16px]">
                      <div className="flex flex-col gap-[16px]">
                        <p className="text-[24px] text-primary-800 font-semibold">
                          아이패드 미니 팔아요
                        </p>
                        <p className="text-[40px] text-primary-800 font-semibold">
                          500,000원
                        </p>
                      </div>
                      <Image
                        src="/ic_kebab.svg"
                        alt="kebab"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[16px]">
                      <p className="text-[16px] text-primary-600 font-semibold">
                        상품 소개
                      </p>
                      <p className="text-[16px] text-primary-600 font-normal">
                        액정에 잔기스랑 주변부 스크래치있습니다만
                        예민하신분아니면 전혀 신경쓰이지않을정도입니다. 박스
                        보관중입니다. 메모용과 넷플릭스용으로만쓰던거라 뭘
                        해보질 않아 기능이나 문제점을 못느꼈네요 잘 안써서
                        싸게넘깁니다! 택배거래안합니다.
                      </p>
                    </div>

                    <div className="flex flex-col gap-[16px]">
                      <p className="text-[16px] text-primary-600 font-semibold">
                        상품 태그
                      </p>
                      <div className="flex gap-[8px]">
                        <Tag tagText="아이패드미니" />
                        <Tag tagText="아이패드미니" />
                        <Tag tagText="아이패드미니" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[62px] flex justify-between items-center">
                  <div className="flex gap-[16px] items-center">
                    <Image
                      src="/ic_profile.svg"
                      alt="profile"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col gap-[2px]">
                      <p className="text-[14px] text-primary-600 font-medium">
                        총명한판다
                      </p>
                      <p className="text-[14px] text-primary-400 font-normal">
                        2024.01.02
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-[24px] items-center">
                    <div className="border border-primary-200 h-[34px]"></div>
                    <div className="flex gap-[4px] px-[12px] py-[4px] border border-primary-200 rounded-[35px] items-center">
                      <Image
                        src="/ic_heart-2.svg"
                        alt="heart"
                        width={32}
                        height={32}
                      />
                      <p className="text-[16px] text-primary-500 font-medium">
                        123
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 mb-[193px]">
          <Link href="/free-board">
            <Image src="/btn_medium.svg" alt="btn" width={240} height={48} />
          </Link>
        </div>
      </div>
    </div>
  );
}
