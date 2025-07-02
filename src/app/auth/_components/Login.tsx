"use client";

import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { FormEvent, useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type TValidatedValues = {
  email: string;
  password: string;
};

export default function Login() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginFail, setIsLoginFail] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [validatedValues, setValidatedValues] = useState<TValidatedValues>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login } = useAuth();

  const { email, password } = validatedValues;

  // 로그인
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setIsLoginFail(false);
      await login(email, password);

      router.push("/products");
    } catch (e) {
      if (e instanceof Error) {
        setModalMessage(e.message);
      }
      setIsModalVisible(true);
      setIsLoginFail(true);
    }
  };

  // 로그인 버튼 활성화
  useEffect(() => {
    if (email && password) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [validatedValues]);

  // 유효성 검사 통과한 값 저장
  const saveValidatedValue = (type: string, value: string): void => {
    setValidatedValues((prevValue) => ({ ...prevValue, [type]: value }));
  };

  // 모달 닫기
  const handleModal = () => {
    setIsLoading(false);
    setIsModalVisible(false);
  };

  return (
    <>
      <AuthModal
        isModalVisible={isModalVisible}
        modalMessage={modalMessage}
        handleModal={handleModal}
      />
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-y-[16px] sm:gap-y-[24px]"
      >
        <AuthInput
          type="email"
          isLoginFail={isLoginFail}
          validatedValues={validatedValues}
          saveValidatedValue={saveValidatedValue}
        />
        <AuthInput
          type="password"
          isLoginFail={isLoginFail}
          validatedValues={validatedValues}
          saveValidatedValue={saveValidatedValue}
        />
        <AuthButton type="로그인" isActive={isActive} isLoading={isLoading} />
      </form>
    </>
  );
}
