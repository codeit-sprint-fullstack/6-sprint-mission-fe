"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getEmailError, getPasswordError } from "@/utils/validation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const emailErr = getEmailError(email);
    const pwErr = getPasswordError(password);
    setEmailError(emailErr);
    setPasswordError(pwErr);
    setIsFormValid(!emailErr && !pwErr && !!email && password.length >= 8);
  }, [email, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      console.log(data);
      alert("로그인 성공");
      router.push("/market");
    } catch (error) {
      alert((error as Error).message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <Image
        src="/logo.svg"
        alt="logo"
        width={396}
        height={132}
        className="mb-[40px]"
      />
      <form onSubmit={handleLogin} className="w-full max-w-[640px]">
        {/* 이메일 입력 */}
        <div className="mb-6">
          <label className="block text-[18px] font-bold text-primary-800 mb-2">
            이메일
          </label>
          <input
            type="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full h-[56px] pl-[24px] rounded-[12px] bg-[#F3F4F6] border ${
              emailError ? "border-primary" : "border-none"
            }`}
          />
          {emailError && (
            <p className="text-primary text-sm font-semibold mt-2 ml-4">
              {emailError}
            </p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-4">
          <label className="block text-[18px] font-bold text-primary-800 mb-2">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-[56px] pl-[24px] pr-[50px] rounded-[12px] bg-[#F3F4F6] border ${
                passwordError ? "border-primary" : "border-none"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-[16px] top-1/2 -translate-y-1/2"
            >
              <Image
                src={
                  showPassword
                    ? "/btn_visibility_on_24px-1.svg"
                    : "/btn_visibility_on_24px.svg"
                }
                alt="비밀번호 보기 토글"
                width={24}
                height={24}
              />
            </button>
          </div>
          {passwordError && (
            <p className="text-primary text-sm font-semibold mt-2 ml-4">
              {passwordError}
            </p>
          )}
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full h-[56px] rounded-[40px] font-semibold ${
            isFormValid
              ? "bg-primary text-white"
              : "bg-primary-400 text-white cursor-not-allowed"
          }`}
        >
          로그인
        </button>

        {/* 소셜 로그인 */}
        <div className="bg-[#E6F2FF] mt-[24px] rounded-[8px] h-[74px] flex items-center justify-between px-[23px]">
          <p className="text-[16px] font-medium text-primary-800">
            간편 로그인하기
          </p>
          <div className="flex gap-4">
            <Image src="/google.svg" alt="구글 로그인" width={42} height={42} />
            <Image
              src="/kakao.svg"
              alt="카카오 로그인"
              width={42}
              height={42}
            />
          </div>
        </div>

        {/* 회원가입 유도 */}
        <div className="flex justify-center mt-[24px] gap-1">
          <p className="text-[14px] font-medium text-primary-800">
            판다마켓이 처음이신가요?
          </p>
          <Link
            href="/signup"
            className="underline text-primary text-[14px] font-medium"
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
