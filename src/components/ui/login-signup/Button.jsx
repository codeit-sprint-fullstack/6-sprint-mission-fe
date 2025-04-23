import React from "react";

//로그인과 회원가입 페이지에서만 사용됨됨
function Button({ text }) {
  return (
    <button className="w-full h-[56px] rounded-full bg-gray-400 text-white font-semibold text-[20px] mt-[24px]">
      {text}
    </button>
  );
}

export default Button;
