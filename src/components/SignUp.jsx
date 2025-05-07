"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SignUpModal from "@/components/SignUpModal";
import { useAuth } from "@/providers/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUp() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [modalMessage, setModalMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const inputClass = (hasError) =>
    `w-full h-[56px] px-6 rounded-xl bg-gray-100 ${
      hasError
        ? "border border-red-500 focus:ring-0"
        : "border border-transparent focus:ring-2 focus:ring-blue-400"
    } focus:outline-none`;

  const isFormValid =
    email.trim() !== "" &&
    nickname.trim() !== "" &&
    password.trim() !== "" &&
    passwordConfirm.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 에러 초기화
    setEmailError("");
    setNicknameError("");
    setPasswordError("");
    setPasswordConfirmError("");

    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError("잘못된 이메일입니다.");
      valid = false;
    }
    if (nickname.trim().length < 2) {
      setNicknameError("닉네임은 2자 이상이어야 해요.");
      valid = false;
    }
    if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 해요.");
      valid = false;
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await fetch(
        "https://panda-market-api.vercel.app/auth/signUp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            passwordConfirmation: passwordConfirm,
            nickname,
          }),
        }
      );

      const result = await res.json();

      console.log("회원가입 응답:", result);

      if (!res.ok) {
        setModalMessage(result.message || "회원가입에 실패했습니다.");
        return;
      }

      if (
        !result.accessToken ||
        !result.refreshToken ||
        !result.user ||
        !result.user.nickname
      ) {
        setModalMessage("회원가입은 성공했지만 로그인 데이터가 누락됐어요.");
        return;
      }

      login({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        nickname: result.user.nickname,
      });

      alert("회원가입 성공! 로그인 되었습니다.");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("회원가입 에러:", error);
      setModalMessage("에러가 발생했어요.");
    }
  };

  return (
    <>
      {modalMessage && (
        <SignUpModal
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

        {/* 이메일 */}
        <div>
          <label className="font-bold text-[14px] text-gray-800">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            className={inputClass(!!emailError)}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* 닉네임 */}
        <div>
          <label className="font-bold text-[14px] text-gray-800">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            className={inputClass(!!nicknameError)}
          />
          {nicknameError && (
            <p className="text-red-500 text-sm mt-1">{nicknameError}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="font-bold text-[14px] text-gray-800">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* 비밀번호 확인 */}
        <div>
          <label className="font-bold text-[14px] text-gray-800">
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={`${inputClass(!!passwordConfirmError)} pr-12`}
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
            >
              {showPasswordConfirm ? (
                <FiEye size={20} />
              ) : (
                <FiEyeOff size={20} />
              )}
            </div>
          </div>
          {passwordConfirmError && (
            <p className="text-red-500 text-sm mt-1">{passwordConfirmError}</p>
          )}
        </div>

        {/* 가입 버튼 */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full h-14 ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white font-semibold text-xl rounded-[40px] transition`}
        >
          회원가입
        </button>

        <div className="py-4 px-6 mt-2 bg-[#e6f2ff] w-full h-[74px] rounded-[8px]">
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
            이미 계정이 있으신가요?
          </span>
          <Link href="/login">
            <span className="text-blue-500 underline font-medium cursor-pointer">
              로그인
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}
