import React from "react";

function ItemDetail({ item }) {
  return (
    <article className="flex flex-col gap-6 mb-10">
      <div>
        <div className="text-sm font-semibold mb-2">상품 소개</div>
        <div>{item.description}</div>
      </div>
      <div>
        <div className="text-sm font-semibold mb-2">상품 태그</div>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 w-fit">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 rounded-[26px] px-4 py-[6px]"
            >
              #{tag.replace(/#/g, "")}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ItemDetail;
