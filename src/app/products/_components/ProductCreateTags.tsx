"use Client";

import React from "react";
import Image from "next/image";
import ic_cancel from "@/assets/images/products/ic_cancel.svg";

interface IProductCreateTagsProps {
  tags: string[];
  deleteTag: (value: string) => void;
}

export default function ProductCreateTags({
  tags,
  deleteTag,
}: IProductCreateTagsProps) {
  return (
    <section className="flex flex-wrap gap-[12px]">
      {tags?.map((tag, i) => {
        return (
          <article
            key={`${i}_${tag}`}
            className="flex justify-center items-center gap-[8px] bg-secondary-gray-100 rounded-[26px] py-[5px] pr-[12px] pl-[16px]"
          >
            <p>{`#${tag}`}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteTag(tag);
              }}
              className="flex justify-center items-center w-[20px] h-[20px] rounded-full bg-secondary-gray-300 hover:bg-primary-100 cursor-pointer"
            >
              <div className="relative w-[10px] h-[10px]">
                <Image
                  src={ic_cancel}
                  alt="취소"
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          </article>
        );
      })}
    </section>
  );
}
