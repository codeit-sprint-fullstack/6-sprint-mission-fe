"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Input from "@/components/ui/Input";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState("");

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.includes("@")) {
      newErrors.email = "잘못된 이메일입니다.";
    }
    if (form.password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해주세요.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await register(
        form.nickname,
        form.email,
        form.password,
        form.confirmPassword
      );
      alert("가입이 완료되었습니다.");
      router.push("/items");
    } catch (error) {
      const message = error.message || "";
      if (message.includes("email") || message.includes("이메일")) {
        setModalMessage("사용중인 이메일입니다.");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative w-[396px] h-[132px]">
        <Image
          src="/images/logo/logo.svg"
          alt="판다마켓 로고"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full max-w-[640px] mt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            label="이메일"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요"
            error={errors.email}
          />
          <Input
            label="닉네임"
            name="nickname"
            type="text"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
            error={errors.name}
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            error={errors.password}
          />
          <Input
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력해주세요"
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="mt-6 w-full bg-primary-100 text-white py-4 rounded-[40px] font-semibold text-[20px] disabled:bg-secondary-400"
            disabled={
              !form.email ||
              !form.nickname ||
              !form.password ||
              !form.confirmPassword
            }
          >
            회원가입
          </button>
        </form>

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

        <div className="mt-6 text-center text-sm font-[500]">
          <span className="text-secondary-800">이미 계정이 있으신가요? </span>
          <Link href="/login" className="text-primary-100 underline">
            로그인
          </Link>
        </div>
      </div>

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
