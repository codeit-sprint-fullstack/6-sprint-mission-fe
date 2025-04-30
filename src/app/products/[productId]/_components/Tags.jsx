import React from "react";

export default function Tags({ tags }) {
  return (
    <section className="flex justify-start items-center flex-wrap gap-[8px]">
      {tags.map((tag, i) => {
        return (
          <div
            key={`${i}_${tag}`}
            className="flex justify-center items-center py-[5px] px-[16px] rounded-[26px] font-normal text-[16px]/[26px] text-secondary-gray-700 bg-secondary-gray-100"
          >
            <p>{`#${tag}`}</p>
          </div>
        );
      })}
    </section>
  );
}
