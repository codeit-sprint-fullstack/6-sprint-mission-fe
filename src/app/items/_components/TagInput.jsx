"use client";

import React, { useState } from "react";

const TagInput = ({ placeholder, name, setState, state }) => {
  const [tag, setTag] = useState("");

  const handleKey = (e) => {
    if (e.key === "Enter") {
      setState((prev) => [...prev, tag]);
      setTag("");
    }
  };

  const handleClick = (itemTag) => {
    setState((prev) => prev.filter((tag) => tag !== itemTag));
  };

  return (
    <div>
      <p className="text-[18px] font-[700] text-[#1f2937] mb-[16px]">{name}</p>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[56px] px-[24px] rounded-[12px] bg-[#f3f4f6] outline-none"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyUp={handleKey}
      />
      {state && (
        <div className="mt-[14px] flex items-center gap-[12px]">
          {state.map((itemTag, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-[8px] w-[110px] h-[36px] rounded-[26px] bg-[#f3f4f6]"
            >
              <p>#{itemTag}</p>
              <img
                src="/xBtn.png"
                alt="xBtn"
                className="cursor-pointer"
                onClick={() => handleClick(itemTag)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
