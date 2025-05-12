"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { validateConfirmPassword, validatePassword } from "@/utils/validators";

export default function PasswordInput({
  id,
  label,
  placeholder,
  type = "password",
  className = "",
  onChange,
  value: propValue,
  passwordValue, // use this prop in password confirm input field (to pass current password value for validity check)
  isValid: propIsValid,
  isTouched = false,
  ...props
}) {
  const [inputValue, setInputValue] = useState(propValue || "");
  const [visible, setVisible] = useState(false);
  const [currentIsValid, setCurrentIsValid] = useState(
    propIsValid === undefined ? true : propIsValid
  );

  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
      setCurrentIsValid(validateInput(propValue).isValid);
    }
  }, [propValue, passwordValue, id]);

  const validateInput = (value) => {
    if (id === "password") {
      return validatePassword(value);
    } else if (id === "passwordConfirm") {
      return validateConfirmPassword(passwordValue, value);
    }
    return { isValid: true };
  };
  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const validationResult = validateInput(newValue);
    setCurrentIsValid(validationResult.isValid);

    if (onChange) {
      // call the onChange function passed by the parent
      onChange(newValue, validationResult.isValid);
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
          className={`bg-secondary-100 rounded-[12px] h-14 py-4 px-6 outline-primary placeholder:text-secondary-400 w-full ${!currentIsValid && isTouched ? "outline-error" : ""} ${className}`}
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
      {!currentIsValid && isTouched && (
        <p className="text-error text-sm font-semibold leading-6">
          {validateInput(inputValue).message}
        </p>
      )}
    </div>
  );
}
