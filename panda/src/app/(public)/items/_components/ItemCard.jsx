import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

function ItemCard({ item }) {
  const imageUrl = item.images[0] || "assets/product.svg";

  return (
    <section className="bg-[#fcfcfc] h-[267ps] w-[168px] md:w-[220px] md:h-[319px]">
      <div className="w-[168px] h-[168px] md:w-[220px] md:h-[220px] bg-gray-50 mb-[16px] flex items-center">
        <img src={imageUrl} alt="제품 이미지" className="object-cover" />
      </div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[14px] text-gray-800 font-[500]">{item.name}</p>{" "}
        {/*상품명*/}
        <p className="text-gray-800 font-[700]">{`${item.price.toLocaleString()}원`}</p>{" "}
        {/*상품 가격*/}
        {/*좋아요*/}
        <button className="flex items-center gap-[1px]">
          {item.favoriteCount !== 0 ? (
            <FaHeart className="text-pink-500 inline" />
          ) : (
            <CiHeart className="inline" />
          )}
          <span className="text-[12px] text-gray-600 font-[500]">
            {item.favoriteCount}
          </span>
        </button>
      </div>
    </section>
  );
}

export default ItemCard;
