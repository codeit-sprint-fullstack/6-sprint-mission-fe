"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import passWordOk from "../../../../assets/btn_visible.png";
import passWordNotOk from "../../../../assets/btn_not_visible.png";
import loginLogo from "../../../../assets/login_logo.png";
import Image from "next/image";
import isValid from "../components/isValid";
import kakao from "../../../../assets/kakao.png";
import google from "../../../../assets/google.png";
import Link from "next/link";
import { userService } from "@/app/Providers/AuthProvider";
import { useModal } from "@/app/Providers/ModalProvider";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
  passwordConfirmation?: string;
  nickname?: string;
}

type ValidState = boolean | "none";

interface ValidStates {
  email: ValidState;
  password: ValidState;
}

function LoginPage() {
  const router = useRouter();
  const { openModal } = useModal();
  const { Login } = userService();

  const [toggle, setToggle] = useState<boolean>(true);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [validStates, setValidStates] = useState<ValidStates>({
    email: "none",
    password: "none",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await Login(formData); // 로그인 시도
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.push("/items");
      } else {
        console.warn("엑세스 토큰이 없습니다!");
      }
    } catch (err: any) {
      setSubmitError(err.message);
      openModal(() => <Modal message={err.message} />);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-[21.4375rem] md:w-[40rem] gap-[2.5rem]">
        <div className="flex justify-center items-center">
          <Link href={"./"}>
            <Image src={loginLogo} width={198} height={66} alt={"로그인로고"} />
          </Link>
        </div>

        <form className="flex flex-col gap-[1.5rem]">
          {/* 이메일 입력 */}
          <div className="flex flex-col justify-center gap-[1rem]">
            <p>이메일</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() =>
                setValidStates((prev) => ({
                  ...prev,
                  email: isValid("email", formData),
                }))
              }
              placeholder="이메일을 입력해 주세요"
              className={`p-3 rounded-[1rem] bg-[#F3F4F6] w-full focus:outline-none ${
                validStates.email === true
                  ? "border border-blue-500"
                  : validStates.email === false
                  ? "border border-red-500"
                  : ""
              }`}
            />
            {!validStates.email ||
            (submitError && submitError.includes("이메일")) ? (
              <p className="text-red-500 text-[1rem]">
                {submitError && submitError.includes("이메일")
                  ? submitError
                  : "유효하지 않은 이메일입니다."}
              </p>
            ) : null}
          </div>

          {/* 비밀번호 입력 */}
          <div className="flex flex-col justify-center gap-[1rem]">
            <p>비밀번호</p>
            <div className="relative">
              <input
                type={toggle ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() =>
                  setValidStates((prev) => ({
                    ...prev,
                    password: isValid("password", formData),
                  }))
                }
                placeholder="비밀번호를 입력해 주세요"
                className={`p-3 rounded-[1rem] bg-[#F3F4F6] w-full focus:outline-none ${
                  validStates.password === true
                    ? "border border-blue-500"
                    : validStates.password === false
                    ? "border border-red-500"
                    : ""
                }`}
              />
              <Image
                onClick={() => setToggle(!toggle)}
                src={toggle ? passWordOk : passWordNotOk}
                width={20}
                height={20}
                alt="비밀번호 토글"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
            {!validStates.password ||
            (submitError && submitError.includes("비밀번호")) ? (
              <p className="text-red-500 text-[1rem]">
                {submitError && submitError.includes("비밀번호")
                  ? submitError
                  : "비밀번호를 8자리 이상 입력해 주세요."}
              </p>
            ) : null}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!(validStates.email && validStates.password)}
            className={`px-4 py-2 rounded-4xl text-white font-semibold w-full ${
              validStates.email && validStates.password
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
          >
            로그인
          </button>

          {/* 소셜 로그인 */}
          <div className="h-[4.5rem] px-[1rem] flex flex-row justify-between items-center bg-[#E6F2FF] rounded-[0.5rem]">
            <p>간편 로그인하기</p>
            <div className="flex flex-row justify-between items-center gap-[1rem]">
              <a href="https://www.kakaocorp.com/page">
                <Image src={kakao} width={42} height={42} alt="카카오이미지" />
              </a>
              <a href="https://www.google.com">
                <Image src={google} width={42} height={42} alt="구글이미지" />
              </a>
            </div>
          </div>
        </form>

        {/* 회원가입 링크 */}
        <div className="flex flex-row justify-center gap-[0.25rem]">
          <p> 판다마켓이 처음이신가요?</p>
          <Link href={"/register"} className="text-blue-500 underline">
            회원 가입
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
