import React from "react";

const Input = ({ title, placeholder, state, setState, error }) => {
  return (
    <label className="text-left">
      <p className="text-[14px] font-[700] text-[#1F2937] mb-[8px] m:mb-[16px] m:text-[18px]">
        {title}
      </p>
      <input
        className={`bg-[#F3F4F6] w-full h-[56px] rounded-[12px] outline-none px-[24px] ${
          error && "border border-[#F74747]"
        }`}
        type="text"
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <p
        className={`${
          error ? "text-[14px] font-[600] text-[#F74747] mt-[8px]" : "hidden"
        }`}
      >
        {error}
      </p>
    </label>
  );
};

export default Input;
