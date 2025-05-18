"use client";

import Button from "@/components/Button";
import InputForm from "../_components/Input";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SocialLogin from "../_components/SocialLogin";
import { useRouter } from "next/navigation";
import { postSignUp } from "@/api/auth";
import Modal from "../_components/Modal";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [signUpButton, setSignUpButton] = useState(true);

  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();

  /**
   * - 전체 Input 상자에 글을 써야 로그인 버튼이 활성화됨
   * - 유효성 검사를 통과하지 못했을 시, Input 상자에 글을 쓰면 오류 메시지가 제거됨
   */
  useEffect(() => {
    // 1) 로그인 버튼 활성화 여부
    if (
      email.length > 0 &&
      password.length > 0 &&
      nickname.length > 0 &&
      passwordConfirmation.length > 0
    ) {
      setSignUpButton(false);
    } else {
      setSignUpButton(true);
    }

    // 2) 유효성 검사 메시지 제거
    if (email.length > 0) setEmailError(false);
    if (password.length > 0) setPasswordError(false);
    if (nickname.length > 0) setNicknameError(false);
    if (passwordConfirmation.length > 0) setConfirmedPasswordError(false);
  }, [email, password, nickname, passwordConfirmation]);

  /**
   * - 로그인 버튼에 연결: 유효성 검사 및 오류 메시지 출력 + 페이지 이동
   **/
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  } // 나중에 react-hook-form 처리 고려, hoistiong하려고 일반 함수를 씀

  const validateInputs = () => {
    let isValid = true;

    // 이메일
    if (!isValidEmail(email)) {
      setEmailError(true);
      isValid = false;
    }

    // 비밀번호
    if (password.length < 8) {
      setPasswordError(true);
      isValid = false;
    }

    // 비밀번호 확인
    if (passwordConfirmation.length < 8) {
      setConfirmedPasswordError("비밀번호를 8자 이상 입력해주세요.");
      isValid = false;
    } else if (passwordConfirmation !== password) {
      setConfirmedPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    } else {
      setConfirmedPasswordError("");
    }

    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) return;

    try {
      await postSignUp({ email, nickname, password });

      setModalMessage("가입 완료되었습니다.");
      setShowModal(true);

      router.push("/items");
    } catch (err) {
      setModalMessage(err.message);
      setShowModal(true);
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
      <form action="" name="signup" onSubmit={handleSignUp}>
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

        {/* 별칭 */}
        <InputForm
          id="nickname"
          label="닉네임"
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="이름을 입력해주세요"
          isPassword={false}
          errorMessage={
            nicknameError
              ? "똑같은 이름이 있습니다. 이름을 수정해 주세요."
              : null
          }
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

        {/* 비밀번호 확인 */}
        <InputForm
          id="confirmPassword"
          label="비밀번호 확인"
          type="password"
          name="confirm_password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          isPassword={true}
          errorMessage={confirmedPasswordError}
        />

        {/* 로그인 버튼 */}
        <Button
          size="form"
          rounded={true}
          disabled={signUpButton}
          onClick={handleSignUp}
          className="mb-[30px]"
        >
          회원가입
        </Button>
        <SocialLogin />
      </form>

      {/* 페이지 이동 (로그인) */}
      <section className="flex gap-1 text-[14px] font-[500]">
        <p className="text-gray-800 ">판다마켓이 처음이신가요?</p>
        <Link
          href="/signin"
          className="cursor-pointer text-primary-100 underline"
        >
          로그인
        </Link>
      </section>

      {/* 오류 모달 */}
      {showModal && (
        <Modal message={modalMessage} onClick={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default SignUpPage;
