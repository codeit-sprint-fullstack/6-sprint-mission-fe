"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Images from "../ui/Images";
import { useAuth } from "@/app/context/auth.context";

export default function Header() {
  const currentPath = usePathname();
  const { isLogin, user } = useAuth();

  return (
    <header
      className={`${
        (currentPath === "/login" || currentPath === "/register") && "hidden"
      } w-full h-[70px] leading-[70px] border-b-[1px] border-[#dfdfdf]`}
    >
      <div className="flex items-center justify-between m-auto px-4 max-w-[500px] tablet:px-[24px] tablet:max-w-[744px] web:max-w-[1200px]">
        <div className="flex items-center gap-[16px] tablet:gap-[35px]">
          <Link href="/">
            <figure className=" relative w-[81px] h-[27px] tablet:w-[153px] tablet:h-[51px]">
              <Image
                className="object-cover hidden tablet:block"
                src="/logo.png"
                alt="logo"
                fill
              />
              <Image
                className="object-cover tablet:hidden"
                src="/textLogo.png"
                alt="textLogo"
                fill
              />
            </figure>
          </Link>
          <ul className="flex items-center gap-[8px] tablet:gap-[32px] tablet:text-[18px]">
            <Link href="/article">
              <li
                className={`${
                  currentPath === "/article" && "text-[var(--color-main-blue)]"
                }`}
              >
                자유게시판
              </li>
            </Link>
            <Link href="/items">
              <li
                className={`${
                  currentPath === "/items" && "text-[var(--color-main-blue)]"
                }`}
              >
                중고마켓
              </li>
            </Link>
          </ul>
        </div>
        {isLogin ? (
          <div className="flex items-center gap-[6px]">
            <Images
              src={"/profile.png"}
              w={"w-[40px]"}
              h={"h-[40px]"}
              alt={"profile "}
            />
            <p className="text-[18px] text-[#4b5563]">{user}</p>
          </div>
        ) : (
          <Link
            className="w-[88px] h-[42px] bg-[var(--color-main-blue)] text-center leading-[44px] rounded-[8px] text-white"
            href="/login"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
