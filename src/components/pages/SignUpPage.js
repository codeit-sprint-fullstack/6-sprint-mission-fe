"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { isValidEmail, isValidPassword } from "@/lib/validation";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { useModal } from "@/components/ui/AlertModal";
import FormInput from "../ui/FormInput";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email || !isValidEmail(email)) {
      newErrors.email = "잘못된 이메일입니다.";
    }

    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해 주세요.";
    }

    const { lengthOk, patternOk } = isValidPassword(password);
    if (!password || !lengthOk || !patternOk) {
      newErrors.password = !lengthOk
        ? "비밀번호는 8자 이상 입력해주세요."
        : "영문, 숫자, 특수문자만 사용할 수 있습니다.";
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await register(email, nickname, password, passwordConfirm);

      openModal("가입이 완료되었습니다.");
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
          id="nickname"
          label="닉네임"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
          error={errors.nickname}
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

        <FormInput
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호를 다시 입력해 주세요"
          error={errors.passwordConfirm}
          showToggle={true}
          showValue={showConfirm}
          onToggle={() => setShowConfirm((prev) => !prev)}
        />

        <button
          type="submit"
          className="w-full h-14 mt-2 py-3 bg-[#3692FF] rounded-[40px] text-white font-semibold text-xl"
        >
          회원가입
        </button>
      </form>

      <SocialLoginButtons />

      <div className="mt-6 text-sm text-center font-medium">
        이미 회원이신가요?{" "}
        <Link href="/login" className="text-[#3692FF] underline">
          로그인
        </Link>
      </div>
    </AuthFormWrapper>
  );
}
