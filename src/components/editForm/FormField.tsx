import React from "react";
import { FormFieldProps } from "@/types/form";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  error = false,
  errorMessage,
  onChange,
  inputRef,
  className = "",
}: FormFieldProps) {
  const baseClassName = `w-full rounded-xl border-none bg-[#f3f4f6] p-5 text-[#1f2937] focus:outline-none ${
    error ? "border border-[#f74747]" : ""
  }`;

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          className={`${baseClassName} h-[400px] resize-none ${className}`}
          name={name}
          required={required}
          value={value}
          ref={inputRef as React.RefObject<HTMLTextAreaElement | null>}
          placeholder={placeholder}
          onChange={onChange}
        />
      );
    }

    return (
      <input
        className={`${baseClassName} h-14 ${className}`}
        name={name}
        type={type}
        required={required}
        value={value}
        ref={inputRef as React.RefObject<HTMLInputElement | null>}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  };

  return (
    <div className="flex flex-col gap-2.5">
      <span className="mb-2.5 text-lg font-bold">{label}</span>
      {renderInput()}
      {error && errorMessage && (
        <span className="mt-2.5 pl-4 text-sm text-[#f74747]">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
