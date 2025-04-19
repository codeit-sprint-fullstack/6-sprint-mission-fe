"use client";

export default function Button({ buttonText, onClick, type = "button", className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className = {`px-[23px] py-[11.5px] rounded-[8px] bg-primary text-buttonSecondary text-[16px] ${className}`}
    >
      {buttonText}
    </button>
  );
}
