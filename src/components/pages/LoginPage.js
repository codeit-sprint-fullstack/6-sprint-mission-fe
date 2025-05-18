"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useModal } from "@/components/ui/AlertModal";
import { isValidEmail, isValidPassword } from "@/lib/validation";
import Link from "next/link";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import FormInput from "../ui/FormInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const { lengthOk, patternOk } = isValidPassword(password);

    if (!email || !isValidEmail(email)) {
      newErrors.email = "잘못된 이메일입니다.";
    }

    if (!password || !lengthOk || !patternOk) {
      newErrors.password = !lengthOk
        ? "비밀번호는 8자 이상이어야 합니다."
        : "영문, 숫자, 특수문자만 사용할 수 있습니다.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await login(email, password);
      if (!res || !res.accessToken)
        throw new Error("로그인 응답이 올바르지 않습니다.");
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("userId", res.user.id);
      router.push("/items");
      router.refresh();
    } catch (err) {
      openModal(err.message);
    }
  };

  return (
    <AuthFormWrapper>
      <form onSubmit={handleSubmit} className="w-[640px] space-y-6">
        <FormInput
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해 주세요"
          error={errors.email}
        />

        <FormInput
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
          error={errors.password}
          showToggle={true}
          showValue={showPassword}
          onToggle={() => setShowPassword((prev) => !prev)}
        />

        <button
          type="submit"
          className="w-full h-14 mt-2 py-3 bg-[#3692FF] rounded-[40px] text-white font-semibold text-xl"
        >
          로그인
        </button>
      </form>

      <SocialLoginButtons />

      <div className="mt-6 text-sm text-center font-medium">
        판다마켓이 처음이신가요?{" "}
        <Link href="/signup" className="text-[#3692FF] underline">
          회원가입
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
