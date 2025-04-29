"use client";

import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { authService } from "@/service/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function Signup() {
  const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [validatedValues, setValidatedValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  const router = useRouter();
  const { user, signUp } = useAuth();

  const { email, nickname, password, passwordCheck } = validatedValues;

  // 회원가입
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signUp(email, nickname, password, passwordCheck);

      setModalMessage("가입 완료되었습니다.");
      setIsModalVisible(true);
    } catch (e) {
      setModalMessage(e.message);
      setIsModalVisible(true);
    }
  };

  // 로그인 버튼 활성화
  useEffect(() => {
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
  const handleModal = () => {
    setIsModalVisible(false);

    if (user) {
      router.push("/products");
    }
  };

  return (
    <>
      <AuthModal
        isModalVisible={isModalVisible}
        modalMessage={modalMessage}
        handleModal={handleModal}
      />
      <form
        onSubmit={handleSignUp}
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
        <AuthButton type="회원가입" isActive={isActive} />
      </form>
    </>
  );
}
