"use client";

import Link from "next/link";
import { authService } from "@/lib/services/api/authService";
import useFormInput from "@/hooks/useFormInput";
import InputBox from "../ui/InputBox";
import TitleSection from "../ui/TitleSection";
import SocialLogin from "@/app/(auth)/_components/SocialLogin";
import ConfirmModal from "@/app/(main)/(item)/_components/ConfirmModal";

// 이메일 유효성 검사
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 비밀번호 유효성 검사 (8~20자, 영문+숫자+특수문자 포함)
function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/.test(password);
}

export default function LoginPage() {
  const emailInput = useFormInput("", isValidEmail, "잘못된 이메일입니다.");
  const passwordInput = useFormInput(
    "",
    isValidPassword,
    "잘못된 비밀번호입니다.(8~20자, 영문+숫자+특수 포함)"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;

    try {
      response = await authService.login({
        email: emailInput.value,
        password: passwordInput.value,
      });

      if (response.status === 201 && response.data) {
        const { accessToken, refreshToken } = response;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        router.push("/items");
      } else {
        console.error(
          "로그인 실패:",
          response.data?.message || "알 수 없는 오류 발생"
        );

        setModalMessage("로그인에 실패했습니다.");
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage("로그인 요청 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  const isActiveSubmitButton =
    emailInput.value !== "" &&
    passwordInput.value !== "" &&
    !emailInput.error &&
    !passwordInput.error;

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
          <TitleSection titleText={"이메일"} />
          <div>
            <InputBox
              placeHolderText={"이메일을 입력해주세요"}
              inputValueState={emailInput.value}
              setInputValueState={emailInput.onChange}
              onBlur={emailInput.onBlur}
              error={emailInput.error}
              inputClassName="h-14"
            />
          </div>
          <TitleSection titleText={"비밀번호"} />
          <div>
            <InputBox
              placeHolderText={"비밀번호를 입력해주세요"}
              inputValueState={passwordInput.value}
              setInputValueState={passwordInput.onChange}
              inputType={"password"}
              onBlur={passwordInput.onBlur}
              error={passwordInput.error}
              inputClassName="h-14"
            />
          </div>
          <div className="py-4 container">
            <button
              className={`btn-lg ${
                isActiveSubmitButton ? "bg-primary-100" : "bg-gray-400"
              }`}
              type="submit"
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
        <Link
          href={"/register"}
          className="text-brand-blue  underline cursor-pointer"
        >
          회원가입
        </Link>
      </section>
      <section>
        {isModalOpen && (
          <ConfirmModal
            modalTheme={"blue"}
            modalType={"confirmOnly"}
            confirmText={modalMessage}
            handleOnCloseModal={closeModal}
            handleOnClick={closeModal}
          />
        )}
      </section>
    </div>
  );
}
