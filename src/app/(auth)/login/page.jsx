"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Input from "@/components/ui/Input";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { RiFormula } from "react-icons/ri";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [modalMessage, setModalMessage] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // 유효성 검사 및 로그인 로직
    if (!form.email.includes("@")) {
      setErrors((prev) => ({ ...prev, email: "잘못된 이메일입니다." }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (form.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호를 8자 이상 입력해주세요",
      }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    // 유효성 통과 시 // 로그인 API 호출
    try {
      await login(form.email, form.password);
      router.push("/items");
    } catch (error) {
      console.error(error);
      setModalMessage(error.message || "비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Link href="/">
        <div className="relative w-[396px] h-[132px]">
          <Image
            src="/images/logo/logo.svg"
            alt="판다마켓 로고"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="w-full max-w-[640px] mt-6">
        {/* 로그인 폼 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white"
        >
          <Input
            label="이메일"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            error={errors.email}
          />

          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            error={errors.password}
          />

          <button
            type="submit"
            className="mt-6 w-full bg-primary-100 text-white py-4 rounded-[40px] font-semibold text-[20px] disabled:bg-secondary-400"
            disabled={!form.email || !form.password}
          >
            로그인
          </button>
        </form>

        {/* 소셜 로그인 */}
        <div className="mt-6 bg-[#E6F2FF] w-full px-6 py-4 rounded-[8px] flex items-center justify-between">
          <p className="text-[16px] font-[500] text-secondary-800">
            간편 로그인하기
          </p>
          <div className="flex gap-3">
            <a href="https://www.google.com/">
              <div className="relative w-[42px] h-[42px]">
                <Image
                  src="/images/social/Component2.png"
                  alt="Google 로그인"
                  fill
                  className="object-cover"
                />
              </div>
            </a>
            <a href="https://www.kakaocorp.com/page/">
              <div className="relative w-[42px] h-[42px]">
                <Image
                  src="/images/social/Component3.png"
                  alt="카카오 로그인"
                  fill
                  className="object-cover"
                />
              </div>
            </a>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="mt-6 text-center text-sm font-[500]">
          <span className="text-secondary-800">판다마켓이 처음이신가요? </span>
          <Link href="/signup" className="text-primary-100 underline">
            회원가입
          </Link>
        </div>
      </div>

      {/* 에러 모달 */}
      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className="text-red-500 font-semibold">{modalMessage}</p>
            <button
              onClick={() => setModalMessage("")}
              className="mt-4 px-6 py-2 bg-primary-100 text-white rounded-md"
            >
              확인
            </button>
          </div>
        </div>
      )}
      
    </main>
  );
}
