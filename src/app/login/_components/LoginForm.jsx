"use client";
import SocialAuthOptions from "@/app/registration/_components/SocialAuthOptions";
import AuthSubmitButton from "@/components/ui/AuthSubmitButton";
import FormInput from "@/components/ui/FormInput";
import PasswordInput from "@/components/ui/PasswordInput";
import useLoginForm from "@/hooks/useLoginForm";
import React from "react";

export default function LoginForm() {
  const {
    email,
    password,
    isFormValid,
    isEmailValid,
    isPasswordValid,
    handleEmailChange,
    handlePasswordChange,
  } = useLoginForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      console.log("Login form submitted");
    }
  };
  return (
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
      <PasswordInput
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={handlePasswordChange}
        isValid={isPasswordValid}
        required
      />
      <AuthSubmitButton label="로그인" isDisabled={!isFormValid} />
      <SocialAuthOptions />
    </form>
  );
}
