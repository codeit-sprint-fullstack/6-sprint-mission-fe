import React, { useEffect, useState } from "react";
import EyeToggle from "./EyeToggle";
import clsx from "clsx";

// 이메일, 비밀번호 정규 표현식
const REGEX = {
  email:
    /^[0-9a-zA-Z]*@[0-9a-zA-Z][0-9a-zA-Z]*[.]?[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i,
  password: /^[a-zA-Z0-9#?!@$%^&*-]{8,20}$/,
  passwordCheck: /^[a-zA-Z0-9#?!@$%^&*-]{8,20}$/,
};

// 이메일, 비밀번호 에러 메세지
const ERROR_MESSAGE = {
  email: {
    empty: "이메일을 입력해주세요.",
    invalid: "잘못된 이메일 형식입니다.",
    fail: "이메일을 확인해주세요.",
    success: "사용 가능한 이메일입니다.",
    exist: "사용 중인 이메일입니다.",
  },
  password: {
    empty: "비밀번호를 입력해주세요.",
    invalid: "비밀번호를 8~20자 이내로 입력해주세요.",
    fail: "비밀번호를 확인해주세요.",
    success: "비밀번호가 일치합니다.",
  },
  passwordCheck: {
    empty: "비밀번호를 입력해주세요.",
    fail: "비밀번호가 일치하지 않습니다.",
  },
};

// 타입 별 제목
const TITLE_BY_TYPE = {
  email: "이메일",
  nickname: "닉네임",
  password: "비밀번호",
  passwordCheck: "비밀번호 확인",
};

// 타입 별 플레이스홀더
const PLACEHOLDER_BY_TYPE = {
  email: "이메일을 입력해주세요",
  nickname: "닉네임을 입력해주세요",
  password: "비밀번호를 입력해주세요",
  passwordCheck: "비밀번호를 다시 한 번 입력해주세요",
};

export default function AuthInput({
  type,
  isLoginFail,
  validatedValues,
  saveValidatedValue,
}) {
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 타입 별 input 타입 지정
  const INPUT_TYPE_BY_TYPE = {
    email: "email",
    password: isPasswordVisible ? "text" : "password",
    passwordCheck: isPasswordVisible ? "text" : "password",
  };

  // 로그인 실패 시 에러 메시지
  useEffect(() => {
    if (isLoginFail) {
      setErrorMsg(ERROR_MESSAGE[type].fail);
    }
  }, [isLoginFail]);

  // 이메일, 비밀번호 에러 메시지
  const checkValidate = (e, type) => {
    const { value } = e.target;
    setInputValue(value);

    // 닉네임 일 때
    if (type === "nickname") {
      return saveValidatedValue(type, value);
    }

    // 빈 값
    if (value === "") {
      saveValidatedValue(type, "");
      return setErrorMsg(ERROR_MESSAGE[type].empty);
    }

    // 비밀번호 확인 실패
    if (
      type === "passwordCheck" &&
      (!REGEX.password.test(validatedValues.password) ||
        validatedValues.password !== value)
    ) {
      saveValidatedValue(type, "");
      return setErrorMsg(ERROR_MESSAGE[type].fail);
    }

    // 유효성 검사 실패
    if (!REGEX[type].test(value)) {
      saveValidatedValue(type, "");
      return setErrorMsg(ERROR_MESSAGE[type].invalid);
    }

    // 통과
    saveValidatedValue(type, value);
    setErrorMsg("");
  };

  // 비밀번호 보기 토글
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex flex-col gap-y-[8px] sm:gap-y-[16px]">
      <label className="font-bold text-[14px]/[24px] sm:text-[18px]/[26px]">
        {TITLE_BY_TYPE[type]}
      </label>
      <div className="relative">
        <input
          className={clsx(
            errorMsg
              ? "border-transparent focus:border-error-red"
              : "border-transparent focus:border-primary-100",
            "w-full h-[56px] rounded-[12px] py-[16px] px-[24px] font-normal text-[16px]/[26px] bg-secondary-gray-100 placeholder:text-secondary-gray-300 outline-none border-[1.5px]"
          )}
          onChange={(e) => checkValidate(e, type)}
          value={inputValue}
          id={type}
          type={INPUT_TYPE_BY_TYPE[type]}
          placeholder={PLACEHOLDER_BY_TYPE[type]}
        />
        {errorMsg && (
          <p className="text-error-red font-semibold text-[15px]/[18px] mt-[8px] ml-[16px]">
            {errorMsg}
          </p>
        )}
        {["password", "passwordCheck"].includes(type) && (
          <EyeToggle
            handlePasswordVisible={handlePasswordVisible}
            isPasswordVisible={isPasswordVisible}
          />
        )}
      </div>
    </div>
  );
}
