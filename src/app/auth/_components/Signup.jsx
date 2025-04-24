"use client";

import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";

export default function Signup() {
  const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validatedValues, setValidatedValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  // 로그인 버튼 활성화
  useEffect(() => {
    const { email, nickname, password, passwordCheck } = validatedValues;

    if (email && nickname && password && passwordCheck) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [validatedValues]);

  // 유효성 검사 통과한 값 저장
  const saveValidatedValue = (type, value) => {
    setValidatedValues((prevValue) => ({ ...prevValue, [type]: value }));
  };

  // 모달 닫기
  const handleModal = () => setIsModalVisible(false);

  // 유저 확인(임시)
  const checkExistUsers = (e) => {
    e.preventDefault();

    const email = "d@d.com";
    const password = "dddddddd";

    if (validatedValues.email !== email) {
      setIsModalVisible(true);
    }
  };

  // // 이메일, 비밀번호 여부 체크 & 로그인 경로 설정 & 모달
  // const emailCheck = () => {
  //   const compare = USER_DATA.some((data) => data.email === email.value);
  //   return compare;
  // };

  // const passwordCheck = () => {
  //   const compare = USER_DATA.some((data) => data.password === password.value);
  //   return compare;
  // };

  // const checkExistUsers = (e) => {
  //   e.preventDefault();

  //   if (emailCheck() && passwordCheck()) {
  //     navigate("/");
  //   } else {
  //     setModalOn(true);
  //   }
  // };

  return (
    <>
      <form
        onSubmit={checkExistUsers}
        className="flex flex-col gap-y-[16px] sm:gap-y-[24px]"
      >
        <AuthInput
          type="email"
          validatedValues={validatedValues}
          saveValidatedValue={saveValidatedValue}
        />
        <AuthInput
          type="nickname"
          validatedValues={validatedValues}
          saveValidatedValue={saveValidatedValue}
        />
        <AuthInput
          type="password"
          validatedValues={validatedValues}
          saveValidatedValue={saveValidatedValue}
        />
        <AuthInput
          type="passwordCheck"
          validatedValues={validatedValues}
          saveValidatedValue={saveValidatedValue}
        />
        <AuthButton isActive={isActive} type="회원가입" />
      </form>
      <AuthModal isModalVisible={isModalVisible} handleModal={handleModal} />
    </>
  );
}
