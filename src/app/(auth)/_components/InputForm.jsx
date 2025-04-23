"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

function InputForm({ label, type, placeholder }) {
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (type === "password") {
      setIsPassword(true);
    }
  }, [type]);

  return (
    <div className="flex flex-col relative">
      <label className="text-sm font-bold">{label}</label>
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        required
        className="bg-gray-100 rounded-xl px-6 py-4 mt-2 mb-4"
      />
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

export default InputForm;
