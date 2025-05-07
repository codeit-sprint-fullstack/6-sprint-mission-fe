"use client";

import Images from "@/components/ui/Images";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "../_components/Input";
import SecretInput from "../_components/SecretInput";
import EasyLogin from "../_components/EasyLogin";
import AuthModal from "../_components/AuthModal";
import { signIn } from "@/api/authApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth.context";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const router = useRouter();
  const { login } = useAuth();

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

    try {
      const result = await signIn(email, password);

      login(result);

      router.push("/items");
    } catch (e) {
      setIsModal({ state: true, message: e.message });
    }
  };

  useEffect(() => {
    if (email === "" || password === "") {
      setIsFilled(false);
    } else {
      setIsFilled(true);
    }
  }, [email, password]);

  return (
    <span>
      <section className="max-w-[743px] h-[100vh] mt-[80px] mx-auto px-[16px] text-center">
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
          <SecretInput
            title="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            state={password}
            setState={setPassword}
            error={error.pwErr}
          />
          <button
            disabled={!isFilled}
            className={`${
              isFilled ? "bg-[var(--color-main-blue)]" : "bg-[#9CA3AF]"
            } w-full h-[56px] rounded-[40px] text-white cursor-pointer text-[20px]`}
            onClick={handleClick}
          >
            로그인
          </button>
        </div>
        <EasyLogin />
        <p className="text-[14px] m:text-[16px]">
          판다마켓이 처음이신가요?{" "}
          <Link className="text-[#3182F6] underline" href={"/register"}>
            회원가입
          </Link>
        </p>
      </section>
      <AuthModal isModal={isModal} setIsModal={setIsModal} />
    </span>
  );
};

export default page;
