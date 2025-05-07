"use client";

import { getItem } from "@/api/itemApi";
import ToggleMenu from "@/app/items/[id]/_components/ToggleMenu";
import Images from "@/components/ui/Images";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ItemInfo = () => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isGnbActive, setIsGnbActive] = useState(false);

  const { id: productId } = useParams();

  useEffect(() => {
    const product = async () => {
      try {
        const data = await getItem(productId);
        setItem(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    product();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[743px] mx-auto mb-[24px] px-[16px] flex flex-col items-center justify-center m:max-w-[1200px] m:flex-row m:px-[24px] m:justify-around m:gap-[16px] l:w-[1200px] l:gap-[24px]">
      <Images
        src={`${item.images[0]}`}
        w={"w-[340px] l:w-[486px]"}
        h={"h-[340px] l:h-[486px]"}
        alt={"이미지"}
      />
      <div className="text-[#1F2937] m:w-[340px] l:w-[690px]">
        <div className="flex items-center justify-between mb-[8px] relative">
          <p className="font-[600] m:text-[20px]">{item.name}</p>
          <span
            className="cursor-pointer"
            onClick={() => setIsGnbActive((prev) => !prev)}
          >
            <Images
              src={"/kebab.png"}
              w={"w-[24px]"}
              h={"h-[24px]"}
              alt={"kebab"}
            />
          </span>
          <ToggleMenu isGnbActive={isGnbActive} />
        </div>
        <p className="text-[24px] font-[600] pb-[16px] border-b border-b-[#E5E7EB] m:text-[32px]">
          {item.price.toLocaleString()}원
        </p>
        <p className="text-[14px] font-[600] pt-[16px] mb-[8px]">상품 소개</p>
        <p>{item.description}</p>
        <p className="text-[14px] font-[600] mt-[24px] mb-[8px]">상품 태그</p>
        <div className="flex items-center gap-[8px] mb-[40px]">
          {item.tags.map((tag) => (
            <p
              key={tag}
              className="px-[16px] py-[6px] bg-[#F3F4F6] rounded-[26px]"
            >
              #{tag}
            </p>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <Images
              src={"/profile.png"}
              w={"w-[40px]"}
              h={"h-[40px]"}
              alt={"profile"}
            />
            <div>
              <p className="text-[14px] font-[500] text-[#4b5563]">
                {item.ownerNickname}
              </p>
              <p className="text-[14px] text-[#9ca3af]">
                {item.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[4px]">
            <Images
              src={"/heart.png"}
              w={"w-[24px]"}
              h={"h-[24px]"}
              alt={"heart"}
            />
            <p>{item.favoriteCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
