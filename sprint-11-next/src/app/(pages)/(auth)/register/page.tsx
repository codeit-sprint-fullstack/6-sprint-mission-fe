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
import { register } from "@/api/auth/auth";
import { useModal } from "@/app/Providers/ModalProvider";
import Modal from "../components/Modal";
import { userService } from "@/app/Providers/AuthProvider";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface ValidStates {
  email: boolean | "none";
  nickname: boolean | "none";
  password: boolean | "none";
  passwordConfirmation: boolean | "none";
}

function RegisterPage() {
  const router = useRouter();
  const { Login } = userService();
  const { openModal } = useModal();

  const [toggle1, setToggle1] = useState<boolean>(true);
  const [toggle2, setToggle2] = useState<boolean>(true);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });

  const [validStates, setValidStates] = useState<ValidStates>({
    email: "none",
    nickname: "none",
    password: "none",
    passwordConfirmation: "none",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await register(formData);
      console.log("응답은:", res);

      try {
        const { email, password } = formData;
        const logindata = { email, password };
        const res_login = await Login(logindata);
      } catch (error: any) {
        openModal(() => <Modal message={error.message} />);
      }

      const token = localStorage.getItem("accessToken");
      if (token) {
        alert("회원가입이 완료되었습니다!");
        router.push("/items");
      } else {
        console.warn("엑세스 토큰이 없습니다!");
      }
    } catch (err: any) {
      openModal(() => <Modal message={err.message} />);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-[21.4375rem] md:w-[40rem] gap-[2.5rem]">
        <div className="flex justify-center items-center">
          <Link href="./">
            <Image src={loginLogo} width={198} height={66} alt={"로그인로고"} />
          </Link>
        </div>

        <form className="flex flex-col  gap-[1.5rem]">
          {/* 각 인풋 요소는 그대로 유지하되 타입만 명시되어 있음 */}
          {/* 생략된 부분은 기존 코드 유지 */}
          {/* 버튼 */}
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

          {/* 소셜 로그인 */}
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

export default RegisterPage;
