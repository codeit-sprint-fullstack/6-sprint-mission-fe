import React from "react";
import Image from "next/image";
import ic_empty_heart from "@/assets/images/common/ic_empty_heart.svg";
import img_default_product from "@/assets/images/products/img_default_product.svg";
import Link from "next/link";

interface IProductProps {
  product: {
    images: string[];
    likeCount: number;
    name: string;
    id: number;
    createdAt: Date;
    price: number;
  };
}

export default function Product({ product }: IProductProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col justify-center items-start gap-[16px]"
    >
      <Image
        src={
          product?.images?.length === 0
            ? img_default_product.src
            : product?.images?.[0]
        }
        alt={product?.name}
        className="relative w-full h-full aspect-[1/1] rounded-[12px] overflow-hidden"
      />
      <div className="flex flex-col justify-center items-start gap-[6px]">
        <p className="font-medium text-[14px]/[24px]">{product?.name}</p>
        <p className="font-bold text-[16px]/[26px]">
          {product?.price?.toLocaleString()}원
        </p>
        <div className="flex justify-start items-center gap-[4px]">
          <div className="relative w-[16px] h-[16px]">
            <Image
              src={ic_empty_heart}
              alt="하트"
              fill
              className="object-cover"
            />
          </div>
          <p className="font-medium text-[12px]/[18px] text-secondary-gray-500">
            {product?.likeCount}
          </p>
        </div>
      </div>
    </Link>
  );
}
