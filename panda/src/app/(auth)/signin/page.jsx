"use client";

import Button from "@/components/Button";
import InputForm from "../_components/Input";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SocialLogin from "../_components/SocialLogin";
import { useRouter } from "next/navigation";
import { postSignIn } from "@/api/auth";
import Modal from "../_components/Modal";
import { useAuth } from "@/providers/AuthProvider";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginButton, setLoginButton] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  /**
   * - 전체 Input 상자에 글을 써야 로그인 버튼이 활성화됨
   * - 유효성 검사를 통과하지 못했을 시, Input 상자에 글을 쓰면 오류 메시지가 제거됨
   */
  useEffect(() => {
    // 1) 로그인 버튼 활성화 여부
    if (email.length > 0 && password.length > 0) {
      setLoginButton(false);
    } else {
      setLoginButton(true);
    }

    // 2) 유효성 검사
    if (email.length > 0) setEmailError(false);
    if (password.length > 0) setPasswordError(false);
  }, [email, password]);

  /**
   * - 로그인 버튼에 연결: 유효성 검사 및 오류 메시지 출력 + 페이지 이동
   **/
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  } // 나중에 react-hook-form 처리 고려, hoistiong하려고 일반 함수를 씀

  const validateInputs = () => {
    let isValid = true;

    if (!isValidEmail(email)) {
      setEmailError(true);
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    try {
      await postSignIn({ email, password });
      router.push("/items");
    } catch (err) {
      setErrorMessage(err.message);
      setShowErrorModal(true);
    }
  };

  /**
   * 본문
   */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-[24px] md:gap-[30px]">
      {/* 판다마켓 로고 */}
      <Link href="/">
        <img
          src="/assets/pc_logo.png"
          alt="판다마켓 로고"
          className="w-[198px] md:w-[396px]"
        />
      </Link>

      {/* Form */}
      <form name="login" onSubmit={handleLogin}>
        {/* 이메일 */}
        <InputForm
          id="email"
          label="이메일"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
          isPassword={false}
          errorMessage={emailError ? "잘못된 이메일입니다." : null}
        />

        {/* 비밀번호 */}
        <InputForm
          id="password"
          label="비밀번호"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          isPassword={true}
          errorMessage={
            passwordError ? "비밀번호를 8자 이상 입력해주세요." : null
          }
        />

        {/* 로그인 */}
        <Button
          size="form"
          rounded={true}
          disabled={loginButton}
          className="mb-[30px]"
          onClick={handleLogin}
        >
          로그인
        </Button>
        <SocialLogin />
      </form>

      {/* 페이지 이동 (회원가입) */}
      <section className="flex gap-1 text-[14px] font-[500]">
        <p className="text-gray-800 ">판다마켓이 처음이신가요?</p>
        <Link
          href="/signup"
          className="cursor-pointer text-primary-100 underline"
        >
          회원가입
        </Link>
      </section>

      {/* 오류 모달 */}
      {showErrorModal && (
        <Modal
          message={errorMessage}
          onClick={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
}

export default LoginPage;
