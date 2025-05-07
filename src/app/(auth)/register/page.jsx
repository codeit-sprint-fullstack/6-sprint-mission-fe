"use client";

import Images from "@/components/ui/Images";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "../_components/Input";
import SecretInput from "../_components/SecretInput";
import EasyLogin from "../_components/EasyLogin";
import { register } from "@/api/authApi";
import AuthModal from "../_components/AuthModal";

const page = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [isFilled, setIsFilled] = useState(true);
  const [error, setError] = useState({
    emailErr: "",
    pwErr: "",
    checkPwErr: "",
  });
  const [isModal, setIsModal] = useState({
    state: false,
    message: "",
  });

  const handleClick = async () => {
    setError({
      emailErr: "",
      pwErr: "",
      checkPwErr: "",
    });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError((prev) => ({ ...prev, emailErr: "잘못된 이메일입니다." }));
    }

    if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        pwErr: "비밀번호를 8자 이상 입력해주세요",
      }));
    }

    if (password !== checkPw) {
      setError((prev) => ({
        ...prev,
        checkPwErr: "비밀번호가 일치하지 않습니다",
      }));
    }

    try {
      await register(email, nickname, password, checkPw);

      setIsModal({ state: true, message: "가입 완료되었습니다" });
    } catch (e) {
      setIsModal({ state: true, message: e.message });
    }
  };

  useEffect(() => {
    if (email === "" || nickname === "" || password === "" || checkPw === "") {
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  }, [email, nickname, password, checkPw]);

  return (
    <span>
      <section className="max-w-[743px] mt-[80px] mx-auto px-[16px] text-center">
        <Link className="inline-block" href={"/"}>
          <Images
            src={"/loginLogo.png"}
            w={"w-[198px] m:w-[396px]"}
            h={"h-[66px] m:h-[132px]"}
            alt={"loginLogo"}
          />
        </Link>
        <div className="flex flex-col gap-[16px] mb-[24px] m:gap-[24px]">
          <Input
            title="이메일"
            placeholder="이메일을 입력해주세요"
            state={email}
            setState={setEmail}
            error={error.emailErr}
          />
          <Input
            title="닉네임"
            placeholder="닉네임을 입력해주세요"
            state={nickname}
            setState={setNickname}
          />
          <SecretInput
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            state={password}
            setState={setPassword}
            error={error.pwErr}
          />
          <SecretInput
            title="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            state={checkPw}
            setState={setCheckPw}
            error={error.checkPwErr}
          />
          <button
            disabled={!isFilled}
            className={`${
              isFilled ? "bg-[var(--color-main-blue)]" : "bg-[#9CA3AF]"
            } w-full h-[56px] rounded-[40px] text-white cursor-pointer text-[20px]`}
            onClick={handleClick}
          >
            회원가입
          </button>
        </div>
        <EasyLogin />
        <p className="text-[14px] m:text-[16px]">
          이미 회원이신가요?{" "}
          <Link className="text-[#3182F6] underline" href={"/login"}>
            로그인
          </Link>
        </p>
        <AuthModal isModal={isModal} setIsModal={setIsModal} />
      </section>
    </span>
  );
};

export default page;
