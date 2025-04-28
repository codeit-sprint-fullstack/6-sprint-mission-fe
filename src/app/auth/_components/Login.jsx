"use client";

import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { authService } from "@/service/auth-service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [validatedValues, setValidatedValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login } = useAuth();

  const { email, password } = validatedValues;

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoginFail(false);
      await login(email, password);

      router.push("/products");
    } catch (e) {
      setModalMessage(e.message);
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
  const saveValidatedValue = (type, value) => {
    setValidatedValues((prevValue) => ({ ...prevValue, [type]: value }));
  };

  // 모달 닫기
  const handleModal = () => setIsModalVisible(false);

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
        <AuthButton
          type="로그인"
          isActive={isActive}
          validatedValues={validatedValues}
        />
      </form>
    </>
  );
}
