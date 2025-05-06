"use client";

import React, { useState } from "react";
import "./../../../components/css/input.scss";

function InputForm(props) {
  // props 목록
  const {
    id,
    name,
    label,
    type = "text",
    value,
    placeholder = "",
    onChange,
    isPassword = false,
    errorMessage = "",
  } = props;

  // 비밀번호 상태 변경
  const [isShowPassword, setShowPassword] = useState(false);

  const toggleEyeIcon = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = isPassword && isShowPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-[8px]">
      {/**
       * 제목
       **/}
      <label
        htmlFor={id}
        className="text-gray-800 font-[700] text-[14px] md:text-[18px]"
      >
        {label}
      </label>

      {/**
       * 내용
       **/}
      <div className="relative w-[343px] md:w-[640px]">
        {/* input form */}
        <input
          id={id}
          name={name}
          value={value}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          required
          className={`bg-gray-100 h-[56px] rounded-[12px] px-[24px] py-[16px] placeholder-gray-400 w-full outline-none focus:border-1 
            ${errorMessage ? "mb-[10px]" : "mb-[30px]"}
            ${errorMessage ? "border border-error" : "focus:border-primary-100"}
            `}
        />
        {/* 비밀번호 처리 아이콘 */}
        {isPassword ? (
          <img
            src={
              isShowPassword
                ? "/assets/opened_eye.png"
                : "/assets/closed_eye.png"
            }
            alt="비밀번호 보이게 하는 아이콘"
            className="w-[20px] h-[18px] absolute top-[18px] right-[18px]"
            onClick={toggleEyeIcon}
          />
        ) : undefined}

        {/* 오류 메시지 */}
        <p
          className={`text-error pl-[16px] font-[600] text-[14px]
          ${errorMessage ? "mb-[30px]" : "mb-0"}`}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
}

export default InputForm;
