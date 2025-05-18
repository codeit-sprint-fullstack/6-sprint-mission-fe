import React from "react";
import Image from "next/image";
import defaultImage from "@/assets/product.svg";
import Likes from "@/components/Likes";
import clsx from "clsx";
import { BASE_URL } from "@/api/apiRequest";

function ItemCard({ product, type }) {
  const imageUrl =
    product.images.length !== 0
      ? `${BASE_URL}/files/${product.images[0].imageUrl}`
      : defaultImage;

  return (
    <section
      className={clsx(
        `bg-[#fcfcfc]`,
        type === "best"
          ? `w-[343px] h-[434px] rounded-[20px] lg:w-[282px] lg:h-[378px] lg:rounded-[16px]`
          : `w-[168px] h-[264px] rounded-[12px] md:w-[221px] md:h-[317px] md:rounded-[16px]`
      )}
    >
      <figure
        className={clsx(
          "relative mb-[16px] w-full",
          type === "best"
            ? "h-[343px] rounded-[20px] lg:h-[282px]"
            : "h-[168px] rounded-[12px] md:h-[221px]"
        )}
      >
        <Image
          src={imageUrl}
          alt="상품 대표 이미지"
          fill
          className="rounded-[inherit]"
        />
      </figure>

      <div className="flex flex-col gap-[6px]">
        <h4 className="text-500-14 text-gray-800">{product.name}</h4>
        <p className="font-bold text-gray-800">{product.price}</p>
        <Likes type="product" id={product.id} />
      </div>
    </section>
  );
}

export default ItemCard;
