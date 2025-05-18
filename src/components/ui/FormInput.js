"use client";

import Image from "next/image";

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
  showToggle = false,
  showValue = false,
  onToggle,
}) {
  const inputClass = `w-full px-6 py-4 rounded-xl bg-gray-100 focus:outline-none ${
    value ? "border border-[#3692FF]" : ""
  } ${error ? "border border-[#F74747]" : ""}`;

  return (
    <div>
      <label htmlFor={id} className="block font-bold text-lg mb-4">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showToggle && showValue ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute top-1/2 right-4 -translate-y-1/2"
            aria-label="비밀번호 보기"
          >
            <Image
              src={
                showValue
                  ? "/images/icons/eye-visible.svg"
                  : "/images/icons/eye-invisible.svg"
              }
              alt="비밀번호 토글"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-[#F74747] font-semibold mt-2">{error}</p>
      )}
    </div>
  );
}
