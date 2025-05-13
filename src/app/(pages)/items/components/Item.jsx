import React from "react";
import defaultitem from "../../../../assets/defalut-item.png";
import likebt from "../../../../assets/likebt.png";
import Image from "next/image";

function Item({ data }) {
  return (
    <div className="flex flex-col gap-[1rem] items-center w-[10.5rem] md:w-[13.75rem]">
      <Image
        src={defaultitem} //data.images?.[0]??
        width={220}
        height={220}
        alt={"디폴트이미지"}
      />

      <div className="w-full flex flex-col gap-[0.5rem] items-start">
        <p className="text-sm font-semibold h-[1.5rem]">{data.name}</p>
        <p className="h-[1.5rem] font-extrabold">
          {new Intl.NumberFormat("ko-KR").format(data.price)}원
        </p>
        <div className="flex flex-row gap-[0.25rem]">
          <Image src={likebt} width={16} height={10} alt={"디폴트조아요"} />
          <p>{data.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
