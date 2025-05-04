"use client";
import { login } from "@/api/auth";
import SocialAuthOptions from "@/components/ui/SocialAuthOptions";
import AuthModal from "@/components/ui/AuthModal";
import AuthSubmitButton from "@/components/ui/AuthSubmitButton";
import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import useLoginForm from "@/hooks/useLoginForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const {
    email,
    password,
    isFormValid,
    isEmailValid,
    isPasswordValid,
    isEmailTouched,
    isPasswordTouched,
    handleEmailChange,
    handlePasswordChange,
  } = useLoginForm();

  const router = useRouter();

  // need to improve modal component logic by using Provider later
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    try {
      setIsLoading(true);
      const data = await login({ email, password });
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/items");
    } catch (error) {
      console.error("로그인 실패", error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-center w-full h-full gap-6"
        onSubmit={handleSubmit}
        action="submit"
      >
        <FormInput
          id="email"
          label="이메일"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={handleEmailChange}
          isValid={isEmailValid}
          isTouched={isEmailTouched}
          required
        />
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
          isValid={isPasswordValid}
          isTouched={isPasswordTouched}
          required
        />
        <AuthSubmitButton
          label="로그인"
          isDisabled={!isFormValid || isLoading}
        />
        <SocialAuthOptions />
      </form>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </AuthModal>
    </>
  );
}
