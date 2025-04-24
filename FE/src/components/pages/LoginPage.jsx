"use client";

import { useState } from "react";
import InputBox from "../ui/InputBox";
import TitleSection from "../ui/TitleSection";
import SocialLogin from "@/app/(auth)/_components/SocialLogin";

export default function LoginPage() {
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const isActiveSubmitButton = emailState !== "" && passwordState !== "";

  return (
    <div>
      <section>
        <form>
          <TitleSection titleText={"이메일"} />
          <div className="h-14">
            <InputBox
              placeHolderText={"이메일을 입력해주세요"}
              inputValueState={emailState}
              setInputValueState={setEmailState}
            />
          </div>
          <TitleSection titleText={"비밀번호"} />
          <div className="h-14">
            <InputBox
              placeHolderText={"비밀번호를 입력해주세요"}
              inputType={"password"}
              inputValueState={passwordState}
              setInputValueState={setPasswordState}
            />
          </div>
          <div className="p-4 container">
            <button
              className={`btn-lg ${
                isActiveSubmitButton ? "bg-primary-100" : "bg-gray-400"
              }`}
            >
              로그인
            </button>
          </div>
        </form>
      </section>
      <section>
        <SocialLogin />
      </section>
      <section className="flex gap-2 justify-center p-4 text-sm">
        <span>판다마켓이 처음이신가요?</span>
        <span className="text-brand-blue  underline cursor-pointer">
          회원가입
        </span>
      </section>
    </div>
  );
}
