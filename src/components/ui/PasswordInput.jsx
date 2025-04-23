"use client";
import Image from "next/image";
import { useState } from "react";

export default function PasswordInput({ id, label, placeholder }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col w-full gap-2 md:gap-4">
      {label && (
        <label
          htmlFor={id}
          className="font-bold text-sm md:text-lg text-secondary-800"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="bg-secondary-100 rounded-[12px] h-14 py-4 px-6 placeholder:text-secondary-400 w-full"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400"
        >
          {visible ? (
            <Image
              src="/icons/ic_visibility_on.svg"
              width={24}
              height={24}
              alt="비밀번호 보이기"
            ></Image>
          ) : (
            <Image
              src="/icons/ic_visibility_off.svg"
              width={24}
              height={24}
              alt="비밀번호 숨김"
            ></Image>
          )}
        </button>
      </div>
    </div>
  );
}
