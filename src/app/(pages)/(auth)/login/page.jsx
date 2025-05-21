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
import { userService } from "@/src/app/providers/AuthProvider";
import { useModal } from "@/src/app/providers/ModalProvider";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";

// localStorage.getItem("accessToken",받아온거);
function loginpage() {
  const router = useRouter();
  const { openModal } = useModal();
  const { Login } = userService();
  const [toggle, setToggle] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validStates, setValidStates] = useState({
    email: "none",
    password: "none",
  });
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //
    try {
      const res = await Login(formData); //
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.push("/items"); //
      } else {
        console.warn("엑세스 토큰이 없습니다!");
      }
    } catch (err) {
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
            {!validStates.email ||
            (submitError && submitError.includes("이메일")) ? (
              <p className="text-red-500 text-[1rem]">
                {submitError && submitError.includes("이메일")
                  ? submitError
                  : "유효하지 않은 이메일입니다."}
              </p>
            ) : null}
          </div>

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
                    password: isValid("password", {
                      password: formData.password,
                    }),
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
                onClick={() => setToggle(!toggle)}
                name="password"
                value={formData.password}
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

          <button
            type="submit"
            disabled={!(validStates.email && validStates.password)}
            className={`px-4 py-2 rounded-4xl text-white font-semibold w-full 
                ${
                  validStates.email && validStates.password
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            onClick={handleSubmit}
          >
            로그인
          </button>

          <div className="h-[4.5rem] px-[1rem] flex flex-row justify-between items-center bg-[#E6F2FF] rounded-[0.5rem]">
            <p>간편 로그인하기</p>
            <div className="flex flex-row justify-between items-center gap-[1rem]">
              <a href="https://www.kakaocorp.com/page">
                <Image src={kakao} width={42} height={42} alt="카카오이미지" />
              </a>

              <a href="https://www.google.com">
                {" "}
                <Image src={google} width={42} height={42} alt="구글이미지" />
              </a>
            </div>
          </div>
        </form>

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

export default loginpage;

// const token= data.accessToken;
// localstoge.set?(token)?
// get->가져온다

// 쿠키에 저장은 따로 찾아보기// localStorage.setItem("accessToken",받아온거);

// async function get () {
//     await fetch(url,{
//         const accessTOken=localStorage.getItem("accessToken")
//                 headers:{

//             Authorization: `Bearer ${accessTOken}`
//         }

//     })
// }

// localStorage.clear()
