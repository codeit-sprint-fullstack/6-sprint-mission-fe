"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SignUpModal from "@/components/SignUpModal";

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false); // ⭐ 추가
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setModalMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch(
        "https://panda-market-api.vercel.app/auth/signUp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, nickname, password }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setModalMessage(result.message || "회원가입에 실패했어요.");
        return;
      }

      alert("회원가입 성공! 로그인 해주세요.");
      router.push("/login");
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
        {/* 로고 */}
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
            required
            className="w-full h-[56px] px-6 rounded-xl bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* 닉네임 */}
        <div>
          <label className="font-bold text-[14px] text-gray-800">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            required
            className="w-full h-[56px] px-6 rounded-xl bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
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
              required
              className="w-full h-[56px] px-6 rounded-xl bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none pr-12"
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="font-bold text-[14px] text-gray-800">
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              type={showPasswordConfirm ? "text" : "password"} // ⭐ 눈아이콘 상태 반영
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호를 다시 입력해주세요"
              required
              className="w-full h-[56px] px-6 rounded-xl bg-gray-100 border border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none pr-12"
            />
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPasswordConfirm((prev) => !prev)}
            >
              {showPasswordConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="w-full h-14 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xl rounded-[40px] transition"
        >
          회원가입
        </button>

        {/* 로그인 링크 */}
        <div className="flex justify-center items-center mt-6 gap-1 text-[14px]">
          <span className="text-gray-800 font-medium">
            이미 가입하셨나요?
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
