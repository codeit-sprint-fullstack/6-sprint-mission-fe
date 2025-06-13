import { Product } from "@/types";
import React from "react";

function ItemDetail({ item }: { item: Product }) {
  return (
    <article className="mb-10 flex flex-col gap-6">
      <div>
        <div className="mb-2 text-sm font-semibold">상품 소개</div>
        <div>{item.description}</div>
      </div>
      <div>
        <div className="mb-2 text-sm font-semibold">상품 태그</div>
        <div className="grid w-fit grid-cols-3 gap-2 lg:grid-cols-5">
          {item.tags.map((tag, index) => (
            <span key={index} className="rounded-[26px] bg-gray-100 px-4 py-[6px]">
              #{tag.replace(/#/g, "")}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ItemDetail;
