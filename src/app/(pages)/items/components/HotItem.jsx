import React from "react";
import defaultitem from "../../../../assets/defalut-item.png";
import likebt from "../../../../assets/likebt.png";
import Image from "next/image";

function HotItem({ data }) {
  return (
    <div className="flex flex-col w-[21.4375rem] lg:w-[17.625rem] gap-[1rem]">
      <div className="relative w-full aspect-square">
        <Image
          src={defaultitem}
          alt="상품 이미지"
          fill
          className="object-contain rounded-lg"
        />
      </div>

      {/* 텍스트 영역을 고정 높이로 맞추기 */}
      <div className="w-full flex flex-col justify-start items-start gap-2 h-[5rem]">
        <p className="text-sm font-semibold h-[1.5rem]">{data.name}</p>
        <p className="h-[1.5rem] font-extrabold">
          {new Intl.NumberFormat("ko-KR").format(data.price)}원
        </p>
        <div className="flex flex-row gap-1 items-center h-[1rem]">
          <Image src={likebt} width={16} height={10} alt="좋아요" />
          <p>{data.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

export default HotItem;
