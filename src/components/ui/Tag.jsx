import React from "react";

export default function Tag({ tagText }) {
  return (
    <div className="bg-primary-100 px-[16px] py-[6px] w-fit rounded-[26px]"> 
      <p className="text-[16px] text-primary-800 font-normal">#{tagText}</p>
    </div>
  );
}

// w-fit은 inline-block과 같은 효과를 낼 수 있음
