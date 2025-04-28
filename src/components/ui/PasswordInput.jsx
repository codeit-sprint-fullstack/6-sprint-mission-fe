"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PasswordInput({
  id,
  label,
  placeholder,
  type = "password",
  className = "",
  onChange,
  value: propValue,
  isValid,
  ...props
}) {
  const [inputValue, setInputValue] = useState(propValue || "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
    }
  }, [propValue]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    let currentIsValid = true;

    if (newValue.trim().length < 8) {
      currentIsValid = false;
    } else if (props.required && newValue.trim() === "") {
      currentIsValid = false;
    }

    if (onChange) {
      // call the onChange function passed by the parent
      onChange(newValue, currentIsValid);
    }
  };
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
          onChange={handleChange}
          className={`bg-secondary-100 rounded-[12px] h-14 py-4 px-6 outline-primary placeholder:text-secondary-400 w-full ${!isValid ? "outline-error" : ""} ${className}`}
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
      {!isValid && (
        <p className="text-error text-sm font-semibold leading-6">
          {id === "password"
            ? "비밀번호를 8자 이상 입력해주세요."
            : "비밀번호가 일치하지 않습니다."}
        </p>
      )}
    </div>
  );
}
