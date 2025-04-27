"use client";

import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";

const Product = ({ id, height, name, price, likes = 240, images }) => {
  function formatNumberWithComma(number) {
    return number.toLocaleString();
  }

  return (
    <Link href={`/items/${id}`}>
      <li key={id} className="mb-10 cursor-pointer">
        <div
          className="flex h-full items-center justify-center overflow-hidden rounded-[10px]"
          style={{ height: `${height}px` }}
        >
          {images ? (
            <img
              className="h-full w-full rounded-[10px] object-cover transition-transform duration-200 ease-in-out hover:scale-110"
              src={images[0]}
              alt={name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#f3f4f6]">
              <span className="text-[#9ca3af]">이미지 없음</span>
            </div>
          )}
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <span className="line-clamp-2 h-8 overflow-hidden text-base text-ellipsis text-[#1f2937]">
            {name}
          </span>
          {/* <span className="h-8 overflow-hidden text-ellipsis line-clamp-2 text-base text-[#1f2937]">{description}</span> */}
          <span className="text-[1.4rem] font-bold">
            {formatNumberWithComma(price)} 원
          </span>
          <div className="flex items-center gap-2.5">
            <FaRegHeart className="text-[1.2rem]" />
            <span>{likes}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Product;
