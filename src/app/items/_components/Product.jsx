"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const FALLBACK_IMAGE = "/img/product_skeleton_img.png";

const Product = ({ id, height, name, price, likes = 0, image, isLiked }) => {
  const [imgSrc, setImgSrc] = useState(
    image && image.length > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}${image[0]}`
      : FALLBACK_IMAGE,
  );

  const formatNumberWithComma = (number) => number.toLocaleString();

  return (
    <Link href={`/items/${id}`}>
      <li key={id} className="mb-10 cursor-pointer">
        <div
          className="flex h-full items-center justify-center overflow-hidden rounded-[10px]"
          style={{ height: `${height}px` }}
        >
          <figure className="relative h-full w-full">
            <Image
              src={imgSrc}
              alt={name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              fill
              onError={() => setImgSrc(FALLBACK_IMAGE)}
              className="object-cover transition-transform duration-200 ease-in-out hover:scale-110"
            />
          </figure>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <span className="line-clamp-2 h-8 overflow-hidden text-base text-ellipsis text-[#1f2937]">
            {name}
          </span>
          <span className="text-[1.4rem] font-bold">
            {formatNumberWithComma(price)} 원
          </span>
          <div className="flex items-center gap-2.5">
            {isLiked ? (
              <FaHeart className="text-[1.2rem] text-red-500" />
            ) : (
              <FaRegHeart />
            )}
            <span>{likes}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Product;
