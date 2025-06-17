import Image from "next/image";
import React from "react";
import UnheartIcon from "@/assets/svgs/ic_unheart.svg";
import { Product } from "@/types";

interface ItemCardProps {
  name: Product["name"];
  price: Product["price"];
  image: Product["images"][0];
  favoriteCount: Product["favoriteCount"];
}

function ItemCard({ name, price, image, favoriteCount }: ItemCardProps) {
  return (
    <div className="mb-8 flex flex-col gap-[10px]">
      <Image
        src={image}
        alt="상품 이미지"
        width={168}
        height={168}
        className="aspect-square w-full rounded-xl object-cover"
      />

      <div className="flex flex-col gap-[6px]">
        <h2 className="text-sm">{name}</h2>
        <span className="font-bold">{price}원</span>
        <div className="flex gap-1">
          <UnheartIcon alt="좋아요 아이콘" className="h-4 w-4" />
          <div className="text-xs font-medium text-gray-600">{favoriteCount}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
