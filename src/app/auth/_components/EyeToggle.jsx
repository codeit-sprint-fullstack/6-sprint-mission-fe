"use client";

import React, { useState } from "react";
import Image from "next/image";
import ic_eye_off from "@/assets/images/auth/ic_eye_off.svg";
import ic_eye_on from "@/assets/images/auth/ic_eye_on.svg";
import clsx from "clsx";

export default function EyeToggle({
  handlePasswordVisible,
  isPasswordVisible,
}) {
  return (
    <>
      <div className="absolute w-[24px] h-[24px] top-[16px] right-[24px]">
        <Image
          onClick={handlePasswordVisible}
          src={ic_eye_on}
          alt="비밀번호 표시"
          fill
          className="object-cover cursor-pointer"
        />
      </div>
      <div
        className={clsx(
          isPasswordVisible
            ? "hidden"
            : "absolute w-[24px] h-[24px] top-[16px] right-[24px]"
        )}
      >
        <Image
          onClick={handlePasswordVisible}
          src={ic_eye_off}
          alt="비밀번호 숨기기"
          fill
          className="object-cover cursor-pointer"
        />
      </div>
    </>
  );
}
