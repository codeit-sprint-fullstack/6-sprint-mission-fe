import React from "react";
import clsx from "clsx";

export default function AuthButton({ isActive, type }) {
  return (
    <button
      className={clsx(
        isActive
          ? "bg-primary-100 cursor-pointer"
          : "bg-secondary-gray-300 cursor-default",
        "flex justify-center items-center w-full h-[56px] py-[16px] px-[124px] rounded-[40px] font-semibold text-[20px]/[32px] text-center text-secondary-gray-100"
      )}
      disabled={!isActive}
    >
      {type}
    </button>
  );
}
