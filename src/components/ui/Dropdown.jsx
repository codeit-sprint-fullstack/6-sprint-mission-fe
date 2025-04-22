"use client";
import Image from "next/image";
import { useState } from "react";

export default function Dropdown() {
  const [selected, setSelected] = useState("최신순");
  const [open, setOpen] = useState(false);

  const options = ["최신순", "좋아요순"];

  return (
    <div className="relative text-[16px] ml-[16px] text-primary-800">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between cursor-pointer border border-primary-200 rounded-[12px] px-[20px] py-[9px] w-[130px] bg-white"
      >
        {selected}
        <Image
          src="/ic_arrow_down.svg"
          alt="arrow"
          width={24}
          height={24}
          className="ml-[8px]"
        />
      </div>

      {open && (
        <div className="absolute mt-[4px] w-[130px] border border-primary-200 rounded-[12px] bg-white shadow z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`text-primary-500 px-[12px] py-[8px] cursor-pointer hover:text-primary-800  ${
                selected === option ? "font-semibold text-primary-800 " : ""
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
