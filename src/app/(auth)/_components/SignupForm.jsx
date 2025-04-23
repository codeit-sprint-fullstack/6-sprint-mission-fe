import React from "react";
import InputForm from "./InputForm";

function SignupForm() {
  const inputOptions = [
    { label: "이메일", type: "email", placeholder: "이메일을 입력해주세요" },
    { label: "닉네임", type: "text", placeholder: "닉네임을 입력해주세요" },
    {
      label: "비밀번호",
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
    },
    {
      label: "비밀번호 확인",
      type: "password",
      placeholder: "비밀번호를 다시 한 번 입력해주세요",
    },
  ];

  return (
    <form className="flex flex-col w-full">
      {inputOptions.map((option) => (
        <InputForm
          key={option.label}
          label={option.label}
          type={option.type}
          placeholder={option.placeholder}
        />
      ))}
      <button className="btn-base rounded-[40px] h-[56px] text-xl font-semibold">
        회원가입
      </button>
    </form>
  );
}

export default SignupForm;
