import Image from "next/image";
import defaultImg from "../../../../../public/assets/img/img_item_default.svg";
import React from "react";

function ItemCard({ name, price, image, favoriteCount }) {
  return (
    <div className="flex flex-col gap-[10px] mb-8">
      <Image
        src={image || defaultImg}
        alt="상품 이미지"
        width={168}
        height={168}
        className="object-cover w-full rounded-xl aspect-square"
      />

      <div className="flex flex-col gap-[6px]">
        <h2 className="text-sm">{name}</h2>
        <span className="font-bold">{price}원</span>
        <div className="flex gap-1">
          <img
            src="/assets/icon/ic_unheart.svg"
            alt="좋아요 아이콘"
            className="w-4 h-4"
          />
          <div className="text-xs font-medium text-gray-600">
            {favoriteCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
