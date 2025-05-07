"use client";

import Image from "next/image";
import React, { useState } from "react";

const SecretInput = ({ title, placeholder, state, setState, error }) => {
  const [visibiltity, setVisibility] = useState(true);
  return (
    <label className="text-left">
      <p className="text-[14px] font-[700] text-[#1F2937] mb-[8px] m:mb-[16px] m:text-[18px]">
        {title}
      </p>
      <span className="relative">
        <input
          className={`bg-[#F3F4F6] w-full h-[56px] rounded-[12px] outline-none px-[24px] ${
            error && "border border-[#F74747]"
          }`}
          type={`${visibiltity ? "password" : "text"}`}
          placeholder={placeholder}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <Image
          className="absolute top-[50%] right-[24px] translate-y-[-50%] cursor-pointer"
          src={`${
            visibiltity ? "/btn_visibility_off.png" : "/btn_visibility_on.png"
          }`}
          alt="btn_visibility"
          width={24}
          height={24}
          onClick={() => setVisibility((prev) => !prev)}
        />
      </span>
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

export default SecretInput;
