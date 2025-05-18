"use client";

import AuthorInfo from "@/components/AuthorInfo";
import UDDropdownMenu from "@/components/UDDropdownMenu.jsx";

import React from "react";
import Image from "next/image";
import defaultImage from "@/assets/product.svg";
import useEmblaCarousel from "embla-carousel-react";
import { BASE_URL } from "@/api/apiRequest";
import Likes from "@/components/Likes";

function Item({ product }) {
  const [emblaRef] = useEmblaCarousel();

  if (!product?.product) return null;

  const images =
    product?.product?.images?.length !== 0
      ? product.product.images
      : [{ id: 9999, imageUrl: defaultImage }];

  return (
    <article className="w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-[16px]">
        {/* 이미지 */}
        {images.map((img, i) => (
          <figure
            key={img.id}
            className="relative w-full md:w-[340px] lg:w-[486px] h-[343px] md:h-[340px] lg:h-[486px] rounded-[12px] md:rounded-[16px]"
            ref={emblaRef}
          >
            <Image
              src={
                typeof img.imageUrl === "string"
                  ? `${BASE_URL}/files/${img.imageUrl}`
                  : defaultImage
              }
              alt={`제품 이미지 ${i + 1}`}
              fill
              className="rounded-[inherit]"
            />
          </figure>
        ))}

        {/* 제목, 수정/삭제, 가격 */}
        <section className="w-full flex flex-col gap-[24px]">
          <div>
            <div className="flex justify-between">
              <h2 className="text-gray-800 font-semibold md:text-600-20 lg:text-600-24">
                {product.product.name}
              </h2>
              <UDDropdownMenu type="product" id={product.product.id} />
            </div>

            <p className="text-gray-800 text-600-24 md:text-600-32 lg:text-600-40">
              {product?.product.price.toLocaleString() + "원"}
            </p>
            <hr className="text-gray-200 mt-3" />
          </div>
          <div className="flex flex-col gap-[24px]">
            {/* 상품 소개 */}
            <div>
              <p className="text-[14px] lg:text-[16px] text-gray-800 font-[600] mb-[8px]">
                상품 소개
              </p>
              <p className="text-gray-800">{product.product.description}</p>
            </div>
            {/* 태그 */}
            {product.product.tags && (
              <div>
                <p className="text-[14px] lg:text-[16px] text-gray-600 font-[600] mb-[16px]">
                  상품 태그
                </p>
                {product?.product.tags?.map((tags, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 rounded-[26px] h-[36px] px-[16px] py-[6px] mr-[10px] text-gray-800"
                  >
                    #{tags.tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 작성자 정보 */}
          <section className="w-full h-[50px] flex justify-between items-center mt-[24px]">
            <AuthorInfo
              nickname={product.product.author.nickname}
              createdAt={product.product.createdAt}
            />
            <span className="pl-[24px] border-l border-gray-200">
              <span className="h-[40px] border border-gray-200 px-[12px] py-[4px] flex items-center rounded-[35px] text-gray-500 font-[500] gap-[2px]">
                <Likes type="product" id={product.product.id} />
              </span>
            </span>
          </section>
        </section>
      </div>
    </article>
  );
}

export default Item;
