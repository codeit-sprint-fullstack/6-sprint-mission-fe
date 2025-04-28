"use client";
import { useState, useEffect } from "react";

export default function FormInput({
  id,
  label,
  placeholder,
  type = "text",
  className = "",
  onChange,
  value: propValue, // init value "" passed down from its parents - RegistrationForm
  isValid,
  ...props
}) {
  const [inputValue, setInputValue] = useState(propValue || "");

  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
    }
  }, [propValue]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    let currentIsValid = true;

    if (id === "email") {
      currentIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);
    } else if (id === "nickname") {
      currentIsValid = newValue.trim().length >= 2;
    } else if (props.required && newValue.trim() === "") {
      currentIsValid = false;
    }

    if (onChange) {
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
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`bg-secondary-100 rounded-[12px] h-14 py-4 px-6 outline-primary placeholder:text-secondary-400 ${!isValid ? "outline-error" : ""} ${className}`}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />
      {!isValid && (
        <p className="text-error text-sm font-semibold leading-6">
          {id === "email"
            ? "잘못된 이메일입니다."
            : id === "nickname"
              ? "닉네임은 최소 2자 이상 이어야 합니다."
              : "필수 입력 항목입니다."}
        </p>
      )}
    </div>
  );
}
