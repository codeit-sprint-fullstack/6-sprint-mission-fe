"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    console.log("로그인 요청:", { email, password });
  };

  return (
    <main className="px-4 py-6 max-w-[432px] sm:max-w-[640px] lg:py-[60px] mx-auto">
      {/* 로고 */}
      <Link
        href="/"
        aria-label="홈으로 이동"
        className="block text-center mb-6 sm:mb-10"
      >
        <Image
          src="/logo/logo.svg"
          alt="판다마켓 로고"
          width={198}
          height={40}
          className="sm:w-[396px] mx-auto"
        />
      </Link>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 sm:space-y-4">
          <label
            htmlFor="email"
            className="block font-bold text-sm sm:text-[18px]"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-100 px-6 py-4 rounded-xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2 sm:space-y-4">
          <label
            htmlFor="password"
            className="block font-bold text-sm sm:text-[18px]"
          >
            비밀번호
          </label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-100 px-6 py-4 rounded-xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-6"
              aria-label="비밀번호 보기"
            >
              <Image
                src={
                  showPassword
                    ? "/icons/eye-visible.svg"
                    : "/icons/eye-invisible.svg"
                }
                alt={showPassword ? "비밀번호 보임" : "비밀번호 숨김"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {errorMessage && (
          <p className="text-red-500 font-semibold text-[15px] leading-[18px] pl-4 mt-2">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold text-base hover:bg-blue-600 transition"
        >
          로그인
        </button>
      </form>

      {/* 간편 로그인 */}
      <div className="bg-[#e6f2ff] rounded-lg flex items-center justify-between px-6 py-4 mt-6 mb-6 sm:mt-8 sm:mb-10">
        <h3 className="font-medium text-base leading-6">간편 로그인하기</h3>
        <div className="flex gap-4">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/social/google-logo.png"
              alt="구글 로그인"
              width={42}
              height={42}
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/social/kakao-logo.png"
              alt="카카오톡 로그인"
              width={42}
              height={42}
            />
          </a>
        </div>
      </div>

      {/* 회원가입 링크 */}
      <div className="text-center text-[15px] font-medium text-gray-700">
        판다마켓이 처음이신가요?{" "}
        <Link
          href="/auth/signup"
          className="text-blue-500 underline underline-offset-2"
        >
          회원가입
        </Link>
      </div>
    </main>
  );
}
