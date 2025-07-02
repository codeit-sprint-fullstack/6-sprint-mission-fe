import clsx from "clsx";
import React, { ChangeEvent, KeyboardEvent } from "react";

type TProductInputBody = {
  images: { file: File; url: string }[];
  name: string;
  description: string;
  price: string | number;
  tags: string[];
};

interface IProductInputProps {
  type: keyof TProductInputBody;
  title: string;
  placeholder: string;
  body?: TProductInputBody;
  tagValue?: string;
  errorMsg: string;
  changeValue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addTag?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function ProductInput({
  type,
  title,
  placeholder,
  body = undefined,
  tagValue = undefined,
  errorMsg,
  changeValue,
  addTag = undefined,
}: IProductInputProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[16px]">
        <p className="font-bold text-[18px]/[26px]">{title}</p>
        {type === "tags" ? (
          <input
            onKeyDown={addTag}
            onChange={changeValue}
            value={tagValue}
            type="text"
            name={type}
            id={type}
            placeholder={placeholder}
            className={clsx(
              errorMsg ? "border-error-red" : "border-transparent",
              "h-[56px] bg-secondary-gray-100 rounded-[12px] outline-none border-[1.5px] py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300"
            )}
          />
        ) : (
          <input
            onChange={changeValue}
            value={type !== "images" ? body![type] : undefined}
            type="text"
            name={type}
            id={type}
            placeholder={placeholder}
            className={clsx(
              errorMsg ? "border-error-red" : "border-transparent",
              "h-[56px] bg-secondary-gray-100 rounded-[12px] outline-none border-[1.5px] py-[16px] px-[24px] text-[16px] font-normal placeholder-secondary-gray-300"
            )}
          />
        )}
      </div>
      {errorMsg && (
        <p className="text-error-red font-semibold text-[14px]/[24px] ml-[16px]">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
