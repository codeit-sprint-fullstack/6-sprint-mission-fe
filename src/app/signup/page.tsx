"use client";

import {
  getEmailError,
  getNicknameError,
  getPasswordConfirmError,
  getPasswordError,
} from "@/utils/validation";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signup({ email, password, name: nickname });
      alert("회원가입 성공");
      window.location.href = "/login";
    } catch (error) {
      alert((error as Error).message || "회원가입 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailBlur = () => {
    const error = getEmailError(email);
    setEmailError(error);
  };

  const handlePasswordBlur = () => {
    const error = getPasswordError(password);
    setPasswordError(error);
  };

  const handleNicknameBlur = () => {
    setNicknameError(getNicknameError(nickname));
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordError(getPasswordConfirmError(password, confirmPassword));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const checkFormValidity = () => {
    if (!emailError && !passwordError && email && password.length >= 8) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [email, password, emailError, passwordError]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={396}
            height={132}
            className="mb-[40px]"
          />
        </Link>
        <form onSubmit={handleSignUp}>
          <div className="w-[640px]">
            <div className="mb-6 w-full">
              <label className="text-[18px] text-primary-800 font-bold">
                이메일
              </label>
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`focus:border-primary !bg-[#F3F4F6] rounded-[12px] w-full h-[56px] pl-[24px] mt-[24px] border ${
                  emailError ? "border-red-400" : "border-none"
                }`}
              />
              {emailError && (
                <p className="text-red-400 text-sm font-semibold mt-2 ml-4">
                  {emailError}
                </p>
              )}
            </div>

            <div className="mb-6 w-full">
              <label className="text-[18px] text-primary-800 font-bold">
                닉네임
              </label>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={handleNicknameChange}
                onBlur={handleNicknameBlur}
                className={`focus:border-primary !bg-[#F3F4F6] rounded-[12px] w-full h-[56px] pl-[24px] mt-[24px] border ${
                  nicknameError ? "border-red-400" : "border-none"
                }`}
              />
              {nicknameError && (
                <p className="text-red-400 text-sm font-semibold mt-2 ml-4">
                  {nicknameError}
                </p>
              )}
            </div>

            <div className="mb-4 w-full">
              <label className="text-[18px] text-primary-800 font-bold">
                비밀번호
              </label>
              <div className="relative mt-[24px]">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  className={`!bg-[#F3F4F6] focus:border-primary rounded-[12px] w-full h-[56px] px-[24px] border ${
                    passwordError ? "border-red-400" : "border-none"
                  }`}
                />
                <div
                  onClick={togglePassword}
                  className="absolute right-[24px] top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <Image
                    src={
                      showPassword
                        ? "/btn_visibility_on_24px-1.svg"
                        : "/btn_visibility_on_24px.svg"
                    }
                    alt="비밀번호 토글 아이콘"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              {passwordError && (
                <p className="text-red-400 text-sm font-semibold mt-2 ml-4">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="mb-6 w-full">
              <label className="text-[18px] text-primary-800 font-bold">
                비밀번호 확인
              </label>
              <div className="relative mt-[24px]">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  className={`!bg-[#F3F4F6] focus:border-primary rounded-[12px] w-full h-[56px] px-[24px] border ${
                    confirmPasswordError ? "border-red-400" : "border-none"
                  }`}
                />
                <div
                  onClick={toggleConfirmPassword}
                  className="absolute right-[24px] top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <Image
                    src={
                      showConfirmPassword
                        ? "/btn_visibility_on_24px-1.svg"
                        : "/btn_visibility_on_24px.svg"
                    }
                    alt="비밀번호 확인 토글 아이콘"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              {confirmPasswordError && (
                <p className="text-red-400 text-sm font-semibold mt-2 ml-4">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full h-[56px] rounded-[40px] font-semibold ${
                isFormValid
                  ? "bg-primary text-white"
                  : "bg-primary-400 text-white cursor-not-allowed"
              }`}
            >
              회원가입
            </button>

            <div className="flex justify-center mt-[24px] gap-1">
              <p className="text-[14px] font-medium text-primary-800">
                이미 계정이 있으신가요?
              </p>
              <Link
                href="/login"
                className="underline text-primary text-[14px] font-medium"
              >
                로그인
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
