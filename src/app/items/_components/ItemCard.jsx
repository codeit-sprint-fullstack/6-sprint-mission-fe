import Image from "next/image";
import React from "react";
import itemDefaultImg from "@/app/assets/images/img-item-default.svg";
import heartIcon from "@/app/assets/icons/ic-heart.svg";
export default function ItemCard({ item }) {
  return (
    // wrapper
    <div className="flex flex-col justify-center items-center ">
      <Image
        src={itemDefaultImg}
        width={168}
        height={168}
        alt="default image"
      />
      <div className="flex flex-col">
        <h2 className="font-medium text-sm leading-6 text-secondary-800 ">
          {item.name}
        </h2>
        <p>{item.price}</p>
        <div className="font-medium text-xs leading-[18px] text-secondary-600">
          <Image src={heartIcon} width={16} height={16} alt="like icon" />
          like count
        </div>
      </div>
    </div>
  );
}
