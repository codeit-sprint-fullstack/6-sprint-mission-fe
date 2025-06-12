"use client";
import { useState, useEffect } from "react";
import {
  validateEmail,
  validateNickname,
  isRequired,
} from "@/utils/validators";
import clsx from "clsx";

export default function FormInput({
  id,
  label,
  placeholder,
  type = "text",
  className = "",
  onChange,
  value: propValue, // init value "" passed down from its parents - RegistrationForm
  isValid: propIsValid,
  isTouched = false,
  required,
  ...props
}) {
  const [inputValue, setInputValue] = useState(propValue || "");
  const [currentIsValid, setCurrentIsValid] = useState(
    propIsValid === undefined ? true : propIsValid
  );

  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
      setCurrentIsValid(validateInput(propValue).isValid);
    }
  }, [propValue]);

  const validateInput = (value) => {
    if (id === "email") {
      return validateEmail(value);
    } else if (id === "nickname") {
      return validateNickname(value);
    } else if (required) {
      return isRequired(value);
    }
    return { isValid: true };
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const validationResult = validateInput(newValue);
    setCurrentIsValid(validationResult.isValid);

    if (onChange) {
      onChange(newValue);
    }
  };

  const isInValid = !currentIsValid && isTouched;
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
        className={clsx(
          "bg-secondary-100 border-2 rounded-[12px] h-14 py-4 px-6 placeholder:text-secondary-400 focus:outline-none",
          isInValid ? "border-error" : "border-primary",
          className
        )}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />
      {isInValid && (
        <p className="text-error text-sm font-semibold leading-6">
          {validateInput(inputValue).message}
        </p>
      )}
    </div>
  );
}
