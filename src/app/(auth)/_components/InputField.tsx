"use client";

import { EyeInvisible, EyeVisible } from "@/assets/svgs";
import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

function InputField({ label, name, type, placeholder, value, onChange, error }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative mb-4 flex flex-col">
      <label className="text-sm font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        className={`mt-2 rounded-xl bg-gray-100 px-6 py-4 ${
          error ? "!outline-error-red !focus:outline-none outline" : ""
        }`}
        value={value}
        onChange={onChange}
      />
      {error && <div className="text-error-red mt-2 ml-4 text-sm font-semibold">{error}</div>}
      <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
        {isPassword &&
          (showPassword ? (
            <EyeVisible aria-label="비밀번호 보기" className="absolute top-11 right-6" />
          ) : (
            <EyeInvisible aria-label="비밀번호 숨김" className="absolute top-11 right-6" />
          ))}
      </button>
    </div>
  );
}

export default InputField;
