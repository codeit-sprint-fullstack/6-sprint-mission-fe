"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    router.push("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-[80px]">
          <Link href="/" className="flex items-center">
            <Image
              src="/headerLogo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="cursor-pointer"
            />
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              href="/free-board"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              자유게시판
            </Link>
            <Link
              href="/market"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              마켓
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src="/ic_profile.svg"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || "사용자"}
                  </span>
                  <Image
                    src="/ic_arrow_down.svg"
                    alt="Dropdown"
                    width={16}
                    height={16}
                    className={`transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
