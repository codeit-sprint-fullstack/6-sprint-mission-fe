import React from "react";
import clsx from "clsx";

interface IAuthButtonProps {
  type: string;
  isActive: boolean;
  isLoading: boolean;
}

export default function AuthButton({
  type,
  isActive,
  isLoading,
}: IAuthButtonProps) {
  return (
    <button
      className={clsx(
        isActive
          ? "bg-primary-100 cursor-pointer"
          : "bg-secondary-gray-300 cursor-default",
        "flex justify-center items-center w-full h-[56px] py-[16px] px-[124px] rounded-[40px] font-semibold text-[20px]/[32px] text-center text-secondary-gray-100"
      )}
      disabled={!isActive || isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center items-center gap-[8px]">
          <div className="size-[20px] border-[3px] border-t-[3px] border-secondary-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : (
        type
      )}
    </button>
  );
}
