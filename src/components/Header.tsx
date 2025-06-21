"use client";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LogoutModal from "./LogoutModal";
import Image from "next/image";

function Header() {
  const pathname = usePathname();
  const isBoard = pathname === "/articles" || pathname === "/articles/post";
  const isItems = pathname === "/items";
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClickLogout = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="h-17 border-b border-gray-200 flex justify-between max-w-400 w-full items-center px-4">
        <div className="flex gap-2 md:gap-5 lg:gap-8">
          <Link href="/" className="flex gap-2 items-center ">
            <Image
              alt="logo"
              width={40}
              height={40}
              src="/assets/ic/ic_logo.png"
              className="hidden md:block"
            />
            <p className="text-primary-100 font-bold text-lg title-font">
              판다마켓
            </p>
          </Link>
          <div className="flex gap-2 items-center">
            <Link href="/articles">
              <p
                className={`font-bold md:px-4 ${
                  isBoard ? "text-primary-100" : "text-gray-600"
                }`}
              >
                자유게시판
              </p>
            </Link>
            <Link href="/items">
              <p
                className={`font-bold md:px-4 ${
                  isItems ? "text-primary-100" : "text-gray-600"
                }`}
              >
                중고마켓
              </p>
            </Link>
          </div>
        </div>
        {user ? (
          <div className="flex gap-2 items-center" onClick={handleClickLogout}>
            <Image
              alt="profile"
              src="/assets/ic/ic_profile.png"
              width={40}
              height={40}
            />
            <p className="text-gray-600">{user.nickname}</p>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-primary-100 h-10.5 w-22 text-white rounded-lg">
              로그인
            </button>
          </Link>
        )}
      </div>
      {isModalOpen && <LogoutModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default Header;
