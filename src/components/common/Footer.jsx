"use client";

import React from "react";
import Images from "../ui/Images";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentPath = usePathname();
  return (
    <footer
      className={` ${
        (currentPath === "/login" || currentPath === "/register") && "hidden"
      } h-[160px] bg-[#111827] text-white`}
    >
      <div className="max-w-[375px] m-auto flex flex-col-reverse items-center gap-[24px] pt-[32px] px-[16px] xs:max-w-[744px] xs:px-[24px] xs:flex-row xs:justify-between xs:gap-[0]">
        <p className="text-[#9CA3AF]">@codeit - 2024</p>
        <div className="flex items-center justify-between xs:max-w-[427px]">
          <div className="flex items-center gap-[30px] text-[#E5E7EB]">
            <p>Privacy Policy</p>
            <p>FAQ</p>
          </div>
          <div className="flex items-center gap-[12px]">
            <Images
              src={"/facebook.png"}
              w={"w-[20px]"}
              h={"h-[20px]"}
              alt={"facebook"}
            />
            <Images
              src={"/twitter.png"}
              w={"w-[20px]"}
              h={"h-[20px]"}
              alt={"twitter"}
            />
            <Images
              src={"/youtube.png"}
              w={"w-[20px]"}
              h={"h-[20px]"}
              alt={"youtube"}
            />
            <Images
              src={"/instagram.png"}
              w={"w-[20px]"}
              h={"h-[20px]"}
              alt={"instagram"}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
