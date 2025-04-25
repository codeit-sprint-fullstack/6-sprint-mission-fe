"use client";
import SocialAuthOptions from "@/app/registration/_components/SocialAuthOptions";
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
    handleEmailChange,
    handlePasswordChange,
  } = useLoginForm();

  const router = useRouter();

  // need to improve modal component logic by using Provider later
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("handleSubmit called");
    if (!isFormValid) return;

    try {
      // console.log("api client called");
      setIsLoading(true);
      // send POST request to server
      const response = await fetch(
        "https://panda-market-api.vercel.app/auth/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        console.log("login error", errorData.message);
        setModalMessage("비밀번호가 일치하지 않습니다.");
        setIsModalOpen(true);
        throw new Error("Login failed");
      }
      // use await again to get to the data
      const data = await response.json();
      // get the jwt token info
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;

      if (accessToken) {
        // save access token to the user's localStorage
        // console.log("token received", accessToken);
        localStorage.setItem("accessToken", accessToken);
        // console.log("refresh token received:", refreshToken);
        localStorage.setItem("refreshToken", refreshToken);
        // redirect user to the market page
        router.push("/market");
      } else {
        // remove this line later
        console.log("token not received");
      }
    } catch (error) {
      setErrorMsg(error.message);
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

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMessage}
      </AuthModal>
    </>
  );
}
