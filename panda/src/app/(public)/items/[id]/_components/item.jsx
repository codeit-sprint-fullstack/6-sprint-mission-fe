"use client";

import AuthorInfo from "@/components/AuthorInfo";
import UDDropdownMenu from "@/components/UDDropdownMenu.jsx";
import React from "react";

function Item({ item }) {
  return (
    <section className="w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-[16px]">
        {/* 상품 이미지 */}
        <img
          src={`${item.images}`}
          className="w-full lg:w-[486px] h-[343px] lg:h-[486px] lg:h-548px rounded-[16px]"
        />

        <section className="w-full flex flex-col gap-[24px]">
          {/* 제목, dropdown 메뉴, 가격 */}
          <div>
            <div className="flex justify-between">
              <h2 className="md:text-[20px] lg:text-[24px] text-gray-800 font-[600]">
                {item.name}
              </h2>
              <UDDropdownMenu type="product" id={item.id} />
            </div>

            <p className="text-[24px] md:text-[32px] lg:text-[40px] text-gray-800 font-[600] mb-[16px]">
              {item?.price?.toLocaleString()}원
            </p>
            <hr className="text-gray-200" />
          </div>

          <div className="flex flex-col gap-[24px]">
            {/* 상품 소개 */}
            <div>
              <p className="text-[14px] lg:text-[16px] text-gray-800 font-[600] mb-[8px]">
                상품 소개
              </p>
              <p className="text-gray-800 font-[400]">{item.description}</p>
            </div>
            {/* 태그 */}
            <div>
              <p className="text-[14px] lg:text-[16px] text-gray-600 font-[600] mb-[16px]">
                상품 태그
              </p>
              {item?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 rounded-[26px] h-[36px] px-[16px] py-[6px] mr-[10px] text-gray-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 작성자 정보 */}
          <section className="w-full h-[50px] flex justify-between items-center mt-[24px]">
            <AuthorInfo
              nickname={item.ownerNickname}
              createdAt={item.createdAt}
            />
            <span className="pl-[24px] border-l border-gray-200">
              <span className="h-[40px] border border-gray-200 px-[12px] py-[4px] flex items-center rounded-[35px] text-gray-500 font-[500] gap-[2px]">
                {/* 좋아요 하트 - 나중에 클릭 분기처리 할 것 */}
                <img
                  src="/assets/heart_inactive.png"
                  alt="좋아요 하트(안 누른 상태)"
                />
                {item.favoriteCount}
              </span>
            </span>
          </section>
        </section>
      </div>
    </section>
  );
}

export default Item;
