import { TItem } from "@/types";
import Image from "next/image";
import React from "react";

interface ItemProps {
  item: TItem;
}

function Item({ item }: ItemProps) {
  return (
    <div className="flex flex-col w-42 gap-4">
      <div className="w-42 h-42 flex justify-center items-center bg-gray-50">
        <Image
          alt="default item"
          width={100}
          height={100}
          src={
            `${process.env.NEXT_PUBLIC_API_URL}${item.images[0]}` ||
            "/assets/img/img_item_default.png"
          }
          className=" object-cover"
          layout="responsive"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <p>{item.name}</p>
        <p className="text-gray-800 font-bold">{item.price}원</p>
        <div className="flex items-center gap-1">
          <Image
            alt="heart"
            width={16}
            height={16}
            src="/assets/ic/ic_heart.png"
          />
          <p>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
