"use client";

import Image from "next/image";
import React, { useState } from "react";

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col relative mb-4">
      <label className="text-sm font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        className={`bg-gray-100 rounded-xl px-6 py-4 mt-2 ${
          error ? "outline !outline-error-red !focus:outline-none" : ""
        }`}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="text-error-red text-sm font-semibold mt-2 ml-4">
          {error}
        </div>
      )}
      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {isPassword && (
          <Image
            src={`${
              showPassword
                ? "/assets/icon/eye_visible.svg"
                : "/assets/icon/eye_invisible.svg"
            }`}
            alt="비밀번호 보기"
            width={24}
            height={24}
            className="absolute top-11 right-6"
          />
        )}
      </button>
    </div>
  );
}

export default InputField;
