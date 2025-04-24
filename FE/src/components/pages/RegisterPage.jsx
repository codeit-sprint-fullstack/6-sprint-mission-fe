"use client";

import { useState } from "react";
import TitleSection from "../ui/TitleSection";
import InputBox from "../ui/InputBox";
import SocialLogin from "@/app/(auth)/_components/SocialLogin";

export default function RegisterPage() {
  const [emailState, setEmailState] = useState("");
  const [nickNameState, setNickNameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [confirmPasswordState, setConfirmPasswordState] = useState("");

  const isActiveSubmitButton =
    emailState !== "" &&
    nickNameState !== "" &&
    passwordState !== "" &&
    confirmPasswordState !== "";

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
          <TitleSection titleText={"닉네임"} />
          <div className="h-14">
            <InputBox
              placeHolderText={"닉네임을 입력해주세요"}
              inputValueState={nickNameState}
              setInputValueState={setNickNameState}
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
          <TitleSection titleText={"비밀번호 확인"} />
          <div className="h-14">
            <InputBox
              placeHolderText={"비밀번호를 다시 한 번 입력해주세요"}
              inputType={"password"}
              inputValueState={confirmPasswordState}
              setInputValueState={setConfirmPasswordState}
            />
          </div>
          <div className="p-4 container">
            <button
              className={`btn-lg ${
                isActiveSubmitButton ? "bg-primary-100" : "bg-gray-400"
              }`}
            >
              회원가입
            </button>
          </div>
        </form>
      </section>
      <section>
        <SocialLogin />
      </section>
      <section className="flex gap-2 justify-center p-4 text-sm">
        <span>이미 회원이신가요?</span>
        <span className="text-brand-blue  underline cursor-pointer">
          로그인
        </span>
      </section>
    </div>
  );
}
