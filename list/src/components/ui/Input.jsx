"use client";

import React, { useState } from "react";

export default function Input({ title, height }) {
  const [value, setValue] = useState("");

  if (height) {
    return (
      <div className="w-full">
        <div className="flex items-start bg-secondary rounded-[12px] px-4 py-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`${title}을 입력해 주세요`}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray resize-none"
            style={{
              height: `${height}px`,
              minHeight: `${height}px`,
              maxHeight: `${height}px`,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center bg-secondary rounded-[12px] px-4 py-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`${title}을 입력해 주세요`}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray"
        />
      </div>
    </div>
  );
}
