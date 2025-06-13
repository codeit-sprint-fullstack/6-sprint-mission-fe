"use client";

import { FieldName } from "@/types";
import Image from "next/image";
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
        {isPassword && (
          <Image
            src={`${
              showPassword ? "/assets/icon/eye_visible.svg" : "/assets/icon/eye_invisible.svg"
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
