"use client";

import { ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  className?: string;
}

export default function Input({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  isTextArea = false,
  className = "",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-4 font-bold text-[18px] text-secondary-800"
        >
          {label}
        </label>
      )}
      {isTextArea ? (
        <>
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-6 py-4 border ${
              error ? "border-error" : "border-gray-100"
            } bg-gray-100 rounded-[12px] placeholder:text-secondary-400 text-secondary-800 focus:outline-none focus:ring-1 focus:ring-primary-100 ${className}`}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
          {error && (
            <p className="mt-2 mb-4 font-semibold text-sm text-error">
              {error}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="relative">
            <input
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              type={inputType}
              placeholder={placeholder}
              className={`w-full px-6 py-4 border ${
                error ? "border-error" : "border-gray-100"
              } bg-gray-100 rounded-[12px] placeholder:text-secondary-400 text-secondary-800 focus:outline-none focus:ring-1 focus:ring-primary-100 ${className}`}
              {...rest}
            />

            {/* password toggle button은 input일 때만 */}
            {isPassword && !isTextArea && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-4 right-5 text-xl text-secondary-600"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            )}
          </div>
          {error && (
            <p className=" mt-2 mb-4 font-semibold text-sm text-error">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
