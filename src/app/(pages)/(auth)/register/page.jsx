"use client";
import React, { useState } from "react";
import passWordOk from "../../../../assets/btn_visible.png";
import passWordNotOk from "../../../../assets/btn_not_visible.png";
import loginLogo from "../../../../assets/login_logo.png";
import Image from "next/image";
import isValid from "../components/isValid";
import kakao from "../../../../assets/kakao.png";
import google from "../../../../assets/google.png";
import Link from "next/link";
import { register } from "@/src/api/auth/auth";
import { useModal } from "@/src/app/providers/ModalProvider";
import Modal from "../components/Modal";
import { userService } from "@/src/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
function registerpage() {
  const router = useRouter();
  const { Login } = userService();
  const { openModal, closeMoadl } = useModal();
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const [validStates, setValidStates] = useState({
    email: "none",
    nickname: "none",
    password: "none",
    passwordConfirmation: "none",
  });

  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 기본 form 제출 막기
    try {
      const res = await register(formData);
      console.log("응답은:", res);
      try {
        const { email, password } = formData;
        const logindata = { email, password };
        const res_login = await Login(logindata); //
      } catch (error) {
        openModal(() => <Modal message={error.message} />);
      }
      const token = localStorage.getItem("accessToken");

      if (token) {
        alert("회원가입이 완료되었습니다!");
        router.push("/items"); // ✅ 토큰이 있으면 아이템 페이지로 이동
      } else {
        console.warn("엑세스 토큰이 없습니다!");
      }
    } catch (err) {
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

        <form className="flex flex-col  gap-[1.5rem]">
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
                  email: isValid("email", { email: formData.email }),
                }))
              }
              placeholder="이메일을 입력해 주세요"
              className={`p-3 rounded-[1rem] bg-[#F3F4F6] w-full
                    focus:outline-none 
                    ${
                      validStates.email === true
                        ? "border border-blue-500"
                        : validStates.email === false
                        ? "border border-red-500"
                        : "" // 'none'인 경우: border 없음
                    }`}
            />
            {!validStates.email ? (
              <p className="text-red-500 text-[1rem]">
                유효하지 않은 이메일입니다.
              </p>
            ) : null}
          </div>
          <div className="flex flex-col justify-center gap-[1rem]">
            <p>닉네임</p>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              onBlur={() =>
                setValidStates((prev) => ({
                  ...prev,
                  nickname: isValid("nickname", {
                    nickname: formData.nickname,
                  }),
                }))
              }
              placeholder="닉네임을 입력해 주세요"
              className={`p-3 rounded-[1rem] bg-[#F3F4F6] w-full
                    focus:outline-none 
                    ${
                      validStates.nickname === true
                        ? "border border-blue-500"
                        : validStates.nickname === false
                        ? "border border-red-500"
                        : "" // 'none'인 경우: border 없음
                    }`}
            />
            {!validStates.nickname ? (
              <p className="text-red-500 text-[1rem]">닉네임을 입력해주세요.</p>
            ) : null}
          </div>

          <div className="flex flex-col justify-center gap-[1rem]">
            <p>비밀번호</p>
            <div className="relative">
              <input
                type={toggle1 ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() =>
                  setValidStates((prev) => ({
                    ...prev,
                    password: isValid("password", {
                      password: formData.password,
                    }),
                    passwordConfirmation: formData.passwordConfirmation
                      ? isValid("passwordConfirmation", {
                          password: formData.password,
                          passwordConfirmation: formData.passwordConfirmation,
                        })
                      : prev.passwordConfirmation,
                  }))
                }
                placeholder="비밀번호를 입력해 주세요"
                className={`p-3 rounded-[1rem] bg-[#F3F4F6] w-full
                    focus:outline-none 
                    ${
                      validStates.password === true
                        ? "border border-blue-500"
                        : validStates.password === false
                        ? "border border-red-500"
                        : "" // 'none'인 경우: border 없음
                    }`}
              />
              <Image
                onClick={() => setToggle1(!toggle1)}
                name="password"
                value={formData.password}
                src={toggle1 ? passWordOk : passWordNotOk}
                width={20}
                height={20}
                alt="비밀번호 토글"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
            {!validStates.password ? (
              <p className="text-red-500 text-[1rem]">
                비밀번호를 8자리 이상 입력해 주세요.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col justify-center gap-[1rem]">
            <p>비밀번호 확인</p>
            <div className="relative">
              <input
                type={toggle2 ? "password" : "text"}
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
                onBlur={() =>
                  setValidStates((prev) => ({
                    ...prev,
                    passwordConfirmation: isValid("passwordConfirmation", {
                      password: formData.password,
                      passwordConfirmation: formData.passwordConfirmation,
                    }),
                  }))
                }
                placeholder="비밀번호를 다시한번 입력해 주세요"
                className={`p-3 rounded-[1rem] bg-[#F3F4F6] w-full
                    focus:outline-none 
                    ${
                      validStates.passwordConfirmation === true
                        ? "border border-blue-500"
                        : validStates.passwordConfirmation === false
                        ? "border border-red-500"
                        : "" // 'none'인 경우: border 없음
                    }`}
              />
              <Image
                onClick={() => setToggle2(!toggle2)}
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                src={toggle2 ? passWordOk : passWordNotOk}
                width={20}
                height={20}
                alt="비밀번호 확인 토글"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
            {!validStates.passwordConfirmation ? (
              <p className="text-red-500 text-[1rem]">
                비밀번호가 일치하지 않습니다.
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className={`px-4 py-2 rounded-4xl text-white font-semibold w-full 
              ${
                validStates.email &&
                validStates.password &&
                validStates.passwordConfirmation &&
                validStates.nickname
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={handleSubmit}
          >
            회원 가입
          </button>

          <div className="h-[4.5rem] px-[1rem] flex flex-row justify-between items-center bg-[#E6F2FF] rounded-[0.5rem]">
            <p>간편 로그인하기</p>
            <div className="flex flex-row justify-between items-center gap-[1rem]">
              <Image src={kakao} width={42} height={42} alt="카카오이미지" />
              <Image src={google} width={42} height={42} alt="카카오이미지" />
            </div>
          </div>
        </form>

        <div className="flex flex-row justify-center gap-[0.25rem]">
          <p> 이미 회원이신가요?</p>
          <Link href={"/login"} className="text-blue-500 underline">
            로그인
          </Link>
        </div>
      </div>
    </section>
  );
}

export default registerpage;
