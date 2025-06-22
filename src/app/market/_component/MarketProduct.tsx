"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface MarketProductProps {
  id: number;
  name: string;
  price: number;
  favoriteCount: number;
}

export default function MarketProduct({
  id,
  name,
  price,
  favoriteCount,
}: MarketProductProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/market/${id}`);
  };

  return (
    <div onClick={handleClick}>
      <Image src="/img_default.svg" alt="default" width={220} height={220} />
      <div className="flex flex-col mt-[16px] gap-[8px]">
        <div className="flex flex-col gap-[8px]">
          <p className="text-[14px] text-primary-800 font-medium">{name}</p>
          <p className="text-[16px] text-primary-800 font-bold">{price}</p>
        </div>
        <div className="flex items-center gap-1">
          <Image src="/ic_heart.svg" alt="heart" width={16} height={16} />
          <p className="text-[12px] text-primary-600 font-medium">
            {favoriteCount}
          </p>
        </div>
      </div>
    </div>
  );
}
