"use client";

import React from "react";

function Button({
  text,
  onClick,
  disabled,
  width,
  height,
  rounded = "rounded-[8px]",
  image,
}) {
  return (
    <button
      className={`${width} ${height} ${rounded} py-[11.5px] px-[23px] font-pretendard
      gap-[8px] cursor-pointer text-white flex justify-center items-center 
      ${disabled ? "bg-fifth text-third" : "bg-primary text-white"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {image ? <img src={image} /> : null}
    </button>
  );
}

export default Button;
