import React from "react";

function Btn({ text }) {
  return (
    <div className="bg-[#3692ff] font-pretendard w-[88px] h-[42px] py-[11.5px] px-[23px] rounded-[8px] cursor-pointer text-white flex items-center">
      {text}
    </div>
  );
}

export default Btn;
