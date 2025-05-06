"use client";

import React from "react";
import "../components/css/input.scss";
import clsx from "clsx";

function NormalInput({
  type = "text",
  label,
  id,
  value,
  placeholder,
  onChange,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      {/* 제목 */}
      <label htmlFor={id} className="inputTextOnly18">
        {label}
      </label>
      {/* input */}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          "input",
          errorMessage ? "border border-error" : "outline-0"
        )}
      />
      {/* 오류 메시지 */}
      <p className={clsx("text-error pl-[16px] font-[600] text-[14px]")}>
        {errorMessage}
      </p>
    </div>
  );
}

export default NormalInput;
