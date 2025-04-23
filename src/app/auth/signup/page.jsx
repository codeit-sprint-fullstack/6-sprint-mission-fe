"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 에러 메시지 정의 (React 코드의 errors.js 대체용)
const errors = {
  emailEmpty: "이메일을 입력하세요.",
  nicknameEmpty: "닉네임을 입력하세요.",
  passwordEmpty: "비밀번호를 입력하세요.",
  passwordInvalid: "비밀번호는 최소 8자 이상이어야 합니다.",
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
};

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) return setErrorMessage(errors.emailEmpty);
    if (!formData.nickname) return setErrorMessage(errors.nicknameEmpty);
    if (!formData.password) return setErrorMessage(errors.passwordEmpty);
    if (formData.password.length < 8)
      return setErrorMessage(errors.passwordInvalid);
    if (formData.password !== formData.passwordConfirmation)
      return setErrorMessage(errors.passwordMismatch);

    setErrorMessage("");
    console.log("회원가입 요청:", formData);
    // TODO: API 연동
  };

  return (
    <main className="px-4 py-6 max-w-[432px] sm:max-w-[640px] lg:py-[60px] mx-auto">
      {/* 로고 */}
      <Link href="/" className="block text-center mb-6 sm:mb-10">
        <Image
          src="/logo/logo.svg"
          alt="판다마켓 로고"
          width={198}
          height={40}
          className="sm:w-[396px] mx-auto"
        />
      </Link>

      {/* 회원가입 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 */}
        <div className="space-y-2 sm:space-y-4">
          <label
            htmlFor="email"
            className="block font-bold text-sm sm:text-[18px]"
          >
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-100 px-6 py-4 rounded-xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 닉네임 */}
        <div className="space-y-2 sm:space-y-4">
          <label
            htmlFor="nickname"
            className="block font-bold text-sm sm:text-[18px]"
          >
            닉네임
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요"
            value={formData.nickname}
            onChange={handleChange}
            required
            className="w-full bg-gray-100 px-6 py-4 rounded-xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 비밀번호 */}
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
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 px-6 py-4 rounded-xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-6"
              aria-label="비밀번호 보기"
            >
              <Image
                src={
                  showPassword
                    ? "/icons/eye-visible.svg"
                    : "/icons/eye-invisible.svg"
                }
                alt={showPassword ? "비밀번호 표시" : "비밀번호 숨김"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="space-y-2 sm:space-y-4">
          <label
            htmlFor="passwordConfirmation"
            className="block font-bold text-sm sm:text-[18px]"
          >
            비밀번호 확인
          </label>
          <div className="relative flex items-center">
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해 주세요"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 px-6 py-4 rounded-xl text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-6"
              aria-label="비밀번호 보기"
            >
              <Image
                src={
                  showPasswordConfirm
                    ? "/icons/eye-visible.svg"
                    : "/icons/eye-invisible.svg"
                }
                alt={showPasswordConfirm ? "비밀번호 표시" : "비밀번호 숨김"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold text-base hover:bg-blue-600 transition"
        >
          회원가입
        </button>
      </form>

      {/* 에러 메시지 */}
      {errorMessage && (
        <p className="text-red-500 font-semibold text-[15px] leading-[18px] pl-4 mt-4">
          {errorMessage}
        </p>
      )}

      {/* 소셜 로그인 */}
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

      {/* 로그인 페이지 이동 */}
      <p className="text-center text-[15px] font-medium text-gray-700">
        이미 회원이신가요?{" "}
        <Link
          href="/auth/login"
          className="text-blue-500 underline underline-offset-2"
        >
          로그인
        </Link>
      </p>
    </main>
  );
}
