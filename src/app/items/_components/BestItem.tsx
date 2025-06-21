import { TItem } from "@/types";
import Image from "next/image";
import React from "react";

interface BestItemProps {
  item: TItem;
}

function BestItem({ item }: BestItemProps) {
  const heart = item.favoriteCount;
  return (
    <div className="flex flex-col gap-2 w-85 h-109 lg:w-70 lg:h-94 ">
      <div className="w-85 h-85 lg:w-70 lg:h-70">
        <Image
          alt="default"
          className=" object-cover"
          width={100}
          height={100}
          src={
            `${process.env.NEXT_PUBLIC_API_URL}${item.images[0]}` ||
            "/assets/img/img_default.png"
          }
          layout="responsive"
        ></Image>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="text-sm">{item.name}</div>
        <div className="text-gray-800 font-bold">{item.price}원</div>
        <div className="flex items-center gap-1">
          <Image
            alt="heart"
            width={14}
            height={12}
            src="/assets/ic/ic_heart.png"
          />
          <div className="text-gray-500">{heart > 9999 ? "9999+" : heart}</div>
        </div>
      </div>
    </div>
  );
}

export default BestItem;
