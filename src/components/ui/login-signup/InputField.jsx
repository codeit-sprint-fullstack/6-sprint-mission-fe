import React from "react";

//로그인과 회원가입, 제품상세 에서만 사용 + 라벨이 있음
function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  isPwMatched = true,
  width = "w-[640px]",
  height = "h-[56px]",
}) {
  return (
    <div className="flex flex-col justify-between">
      <label
        htmlFor={`input-${type}`}
        className="text-[18px] font-bold pb-[16px]"
      >
        {label}
      </label>

      <input
        type={type}
        id={`input-${type}`}
        placeholder={placeholder}
        className={`${width} ${height} bg-gray-100 text-gray-400 rounded-[10px] pl-[20px]
                  font-normal text-[16px] 
                  ${
                    isPwMatched
                      ? "border-0 focus:outline-none focus:border-[#3692ff] focus:border"
                      : "border-[1px] focus:outline-none focus:border-[#f74747] focus:border"
                  }`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputField;
