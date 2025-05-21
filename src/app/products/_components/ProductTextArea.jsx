import clsx from "clsx";
import React from "react";

export default function ProductTextArea({
  type,
  title,
  placeholder,
  body,
  errorMsg,
  changeValue,
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[16px]">
        <p className="font-bold text-[18px]/[26px]">{title}</p>
        <textarea
          onChange={changeValue}
          value={body[type]}
          name={type}
          id={type}
          placeholder={placeholder}
          className={clsx(
            errorMsg ? "border-error-red" : "border-transparent",
            "h-[282px] bg-secondary-gray-100 rounded-[12px] outline-none border-[1.5px] py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300 resize-none"
          )}
        />
      </div>
      {errorMsg && (
        <p className="text-error-red font-semibold text-[14px]/[24px] ml-[16px]">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
