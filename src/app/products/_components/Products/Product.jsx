import React from "react";
import Image from "next/image";
import ic_empty_heart from "@/assets/images/common/ic_empty_heart.svg";
import img_default_product from "@/assets/images/products/img_default_product.svg";

export default function Product({ product }) {
  return (
    <article className="flex flex-col justify-center items-start gap-[16px]">
      <div className="relative w-full h-full aspect-[1/1] rounded-[12px] overflow-hidden">
        <Image
          src={product.images?.[0] || img_default_product}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-[6px]">
        <p className="font-medium text-[14px]/[24px]">{product.name}</p>
        <p className="font-bold text-[16px]/[26px]">
          {product.price.toLocaleString()}원
        </p>
        <div className="flex justify-start items-center gap-[4px]">
          <div className="relative w-[16px] h-[16px]">
            <Image
              src={ic_empty_heart}
              alt="하트"
              fill
              className="object-cover"
            />
          </div>
          <p className="font-medium text-[12px]/[18px] text-secondary-gray-500">
            {product.favoriteCount}
          </p>
        </div>
      </div>
    </article>
  );
}
