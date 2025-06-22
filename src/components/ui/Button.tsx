import React from "react";

interface ButtonProps {
  buttonText: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  buttonText,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-white px-[23px] py-[8px] rounded-[8px] text-[16px] font-semibold hover:bg-blue-700 transition-colors ${className}`}
    >
      {buttonText}
    </button>
  );
}
