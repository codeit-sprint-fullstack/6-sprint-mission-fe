import React, { useState } from "react";

export default function InputItem({
  id,
  label,
  value,
  onChange,
  placeholder,
  onKeyDown,
  isTextArea,
  error,
}) {
  const inputBaseStyles = `
    shadow-sm
    bg-gray-100
    text-gray-900
    border
    border-gray-300
    rounded-md
    text-base
    w-full
    focus:outline-none
  `;

  const inputPaddingStyles = `
    px-6
    py-4
  `;

  const errorFocusStyle = error
    ? "focus:border-red-500 focus:ring-red-500"
    : "focus:border-blue-500 focus:ring-blue-500";

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-bold text-secondary-800 mb-3 md:text-base"
        >
          {label}
        </label>
      )}
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputBaseStyles} ${inputPaddingStyles} h-48 resize-none ${errorFocusStyle}`}
        />
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`${inputBaseStyles} ${inputPaddingStyles} ${errorFocusStyle}`}
        />
      )}
      {error && <p className="text-error text-xs mt-1 ml-4">{error}</p>}
    </div>
  );
}
