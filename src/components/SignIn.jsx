"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SignInModal from "@/components/SignInModal";
import { useAuth } from "@/providers/AuthProvider";

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (isValidEmail(value)) setEmailError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length >= 8) setPasswordError("");
  };

  const inputClass = (hasError) =>
    `w-full h-[56px] px-6 rounded-xl bg-gray-100 ${
      hasError
        ? "border border-red-500 focus:ring-0"
        : "border border-transparent focus:ring-2 focus:ring-blue-400"
    } focus:outline-none`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError("잘못된 이메일입니다.");
      valid = false;
    }
    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 해요.");
      valid = false;
    }
    if (!valid) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setModalMessage("이메일 또는 비밀번호가 일치하지 않습니다.");
        } else {
          setModalMessage(result.message || "로그인에 실패했어요.");
        }
        return;
      }

      // ✅ 로그인 상태 업데이트 및 저장
      login({
        accessToken: result.token,
        refreshToken: "",
        nickname: result.nickname,
      });

      alert("로그인 성공!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("로그인 에러:", error);
      setModalMessage("에러가 발생했어요.");
    }
  };

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  return (
    <>
      {modalMessage && (
        <SignInModal
          message={modalMessage}
          onClose={() => setModalMessage("")}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto sm:w-[640px] w-[343px] mt-20 space-y-4"
      >
        <div className="relative w-100 h-[132px] mx-auto">
          <Link href="/">
            <Image src="/images/logo/logo.svg" alt="logo" fill />
          </Link>
        </div>

        <div>
          <label className="font-bold text-[14px] text-gray-800">이메일</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요"
            className={inputClass(!!emailError)}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <label className="font-bold text-[14px] text-gray-800">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해주세요"
              className={`${inputClass(!!passwordError)} pr-12`}
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </div>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormFilled}
          className={`w-full h-14 ${
            isFormFilled
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white font-semibold text-xl rounded-[40px] transition`}
        >
          로그인
        </button>

        <div className="py-4 px-6 mt-6 bg-[#e6f2ff] w-full h-[74px] rounded-[8px]">
          <div className="flex items-center justify-between h-full">
            <p className="font-[500] text-base text-gray-800">
              간편 로그인하기
            </p>
            <div className="flex gap-3">
              <div
                className="relative w-[42px] h-[42px] cursor-pointer"
                onClick={() =>
                  (window.location.href = "https://www.google.com")
                }
              >
                <Image src="/images/social/google-logo.png" alt="google" fill />
              </div>
              <div
                className="relative w-[42px] h-[42px] cursor-pointer"
                onClick={() =>
                  (window.location.href = "https://www.kakaocorp.com/page")
                }
              >
                <Image src="/images/social/kakao-logo.png" alt="kakao" fill />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-6 gap-1 text-[14px]">
          <span className="text-gray-800 font-medium">
            판다마켓이 처음이신가요?
          </span>
          <Link href="/register">
            <span className="text-blue-500 underline font-medium cursor-pointer">
              회원가입
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}
