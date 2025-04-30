//react-hook-form을 사용하여 로그인 페이지 제작

"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import InputField from "@/components/ui/login-signup/InputField";
import Button from "@/components/ui/login-signup/Button";
import CompactLogin from "@/components/ui/login-signup/CompactLogin";
import CrossSite from "@/components/ui/login-signup/CrossSite";
import ValidModal from "@/components/ui/login-signup/validModal";

import { useAuth } from "@/providers/AuthProvider";
import { checkTokenExp } from "../../../utils/checkTokenExp";
import { isValidEmail, isValidPassword } from "../../../utils/isValid";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onBlur", // or "onChange"
  });

  const [isVisible, setIsVisible] = useState(false);
  const [validModal, setValidModal] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  // 로그인한 사용자는 접근 제한
  useEffect(() => {
    if (checkTokenExp()) {
      router.push("/items");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);

      if (!result.accessToken) {
        // 로그인 실패
        return;
      }

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("userId", result.user.id);

      router.push("/items");
    } catch (e) {
      console.error("로그인 실패");
      setValidModal(true);
    }
  };

  const togglePasswordVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <main className="flex flex-col items-center">
        <Link
          href="/"
          className="flex flex-row items-center justify-center w-[396px] mb-10"
        >
          <img
            className="w-[103.53px] h-[103.88px] mr-[22.24px] mt-[12.98px] mb-[15.14px]"
            src="/image/login/판다 얼굴.png"
            alt="판다 얼굴"
          />
          <img
            src="/image/login/판다마켓.png"
            className="w-[266px] h-[90px]"
            alt="판다마켓"
          />
        </Link>

        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center">
            <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
              {/* 이메일 필드 */}
              <InputField
                label="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  validate: (value) =>
                    isValidEmail(value) || "유효하지 않은 이메일입니다",
                })}
              />
              {errors.email && (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  {errors.email.message}
                </div>
              )}

              {/* 비밀번호 필드 */}
              <div className="relative">
                <InputField
                  label="비밀번호"
                  type={isVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    validate: (value) =>
                      isValidPassword(value) || "유효하지 않은 비밀번호입니다",
                  })}
                />
                <img
                  src={
                    isVisible
                      ? "/image/login/btn_visibility_on_24px.png"
                      : "/image/login/btn_visibility_off_24px.png"
                  }
                  alt="비밀번호 보기 아이콘"
                  className="absolute left-[600px] top-[58px] w-6 h-6"
                  onClick={togglePasswordVisible}
                />
              </div>
              {errors.password && (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  {errors.password.message}
                </div>
              )}

              <Button text="로그인" disabled={!isValid} />
            </form>

            <CompactLogin />
            <CrossSite
              text="판다마켓은 처음이신가요?"
              linkTo="/sign-up"
              textClick="회원가입"
            />
          </div>
        </div>
      </main>

      {validModal && (
        <ValidModal
          text="비밀번호가 일치하지 않습니다"
          onClose={() => setValidModal(false)}
        />
      )}
    </div>
  );
}
