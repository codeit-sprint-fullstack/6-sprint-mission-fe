import React from "react";

//로그인과 회원가입에서만 사용 + 라벨이 있음
function InputField({ label, type, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col justify-between h-[93px] mt-[24px] ">
      <label htmlFor="input" className="text-[18px] font-bold pb-[16px]">
        {label}
      </label>

      <input
        type={type}
        id="input"
        placeholder={placeholder}
        className="w-[640px] h-[56px] bg-gray-100 text-gray-400 rounded-[10px] border-0 pl-[20px]
                  font-normal text-[16px] focus:outline-none focus:border-[#3692ff] focus:border"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
