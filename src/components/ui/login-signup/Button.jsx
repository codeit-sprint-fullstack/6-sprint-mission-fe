import React from "react";

//로그인과 회원가입 페이지에서만 사용됨
function Button({ text, disabled }) {
  return (
    <button
      className={`w-full h-[56px] rounded-full font-semibold text-[20px] mt-[24px]
  ${disabled ? "bg-primary text-third" : "bg-fifth text-white"}`}
      disabled={!disabled}
    >
      {text}
    </button>
  );
}

export default Button;
