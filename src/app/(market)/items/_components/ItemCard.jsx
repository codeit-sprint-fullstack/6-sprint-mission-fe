import defaultImg from "../../../../../public/assets/img/img_item_default.svg";
import React from "react";

function ItemCard({ name, price, image, favoriteCount, isBest }) {
  return (
    <div className="flex flex-col gap-[10px] mb-8">
      <img
        src={image ?? defaultImg.src}
        alt="상품 이미지"
        className={`${
          isBest ? "w-[343px] lg:w-[282px]" : "w-[168px] md:w-[221px]"
        } rounded-xl aspect-square`}
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
