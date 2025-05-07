"use client";

export default function Button({ buttonText, onClick, type = "button", className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className = {`px-[23px] rounded-[8px] bg-primary text-buttonSecondary text-[16px] cursor-pointer ${className}`}
    >
      {buttonText}
    </button>
  );
}
