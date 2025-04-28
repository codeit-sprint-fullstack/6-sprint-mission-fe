"use client";
import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import React, { useState } from "react";
import useRegistrationForm from "@/hooks/useRegistrationForm";
import AuthSubmitButton from "@/components/ui/AuthSubmitButton";
import SocialAuthOptions from "../../../components/ui/SocialAuthOptions";
import { useRouter } from "next/navigation";
import { signUp } from "@/api/auth";
import AuthModal from "@/components/ui/AuthModal";

export default function SignUpForm() {
  const {
    email,
    nickname,
    password,
    passwordConfirm,
    isFormValid,
    isEmailValid,
    isNicknameValid,
    isPasswordValid,
    isPasswordConfirmValid,
    handleEmailChange,
    handleNicknameChange,
    handlePasswordChange,
    handlePasswordConfirmChange,
  } = useRegistrationForm();

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    try {
      setIsLoading(true);
      const data = await signUp({
        email,
        nickname,
        password,
        passwordConfirm,
      });
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/items");
    } catch (error) {
      console.error("회원가입 실패:", error);
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
          required
        />
        <FormInput
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={handleNicknameChange}
          isValid={isNicknameValid}
          required
        />
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
          isValid={isPasswordValid}
          required
        />
        <PasswordInput
          id="password-confirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          isValid={isPasswordConfirmValid}
          required
        />
        <AuthSubmitButton
          label="회원가입"
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
