import Button from "@/components/Button";
import NormalInput from "@/components/NormalInput";
import React from "react";
import "@/components/css/input.scss";

function ItemAEForm({ type, children, itemId }) {
  return (
    <article className="w-full md:max-w-[696px] lg:max-w-[1200px] mx-auto">
      <section className="flex justify-between items-center mb-[34px]">
        <h2 className="text-[20px] font-[700] text-gray-800">{children}</h2>
        <Button size="sm" disabled>
          {type === "edit" ? "수정" : "등록"}
        </Button>
      </section>
      {/* 서식 */}
      <form className="flex flex-col gap-[24px]">
        <NormalInput id="productNname" label="상품명" />

        <div className="flex flex-col gap-[10px] mb-[10px]">
          <label htmlFor="productInfo" className="inputTextOnly18">
            상품 소개
          </label>
          <textarea
            name="productInfo"
            id="productInfo"
            className="input h-[282px]"
          ></textarea>
        </div>

        <NormalInput id="productPrice" label="판매가격" />

        <NormalInput id="productTag" label="태그" />
      </form>
    </article>
  );
}

export default ItemAEForm;
