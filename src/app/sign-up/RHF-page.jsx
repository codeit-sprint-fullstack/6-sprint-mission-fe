"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { isValidEmail, isValidPassword } from "../../../utils/isValid";
import CompactLogin from "@/components/ui/login-signup/CompactLogin";
import CrossSite from "@/components/ui/login-signup/CrossSite";
import InputField from "@/components/ui/login-signup/InputField";
import Button from "@/components/ui/login-signup/Button";
import Link from "next/link";
import { register as registerAction } from "@/actions/auth";
import { useAuth } from "@/providers/AuthProvider";
import ValidModal from "@/components/ui/login-signup/validModal";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [isVisible, setIsVisible] = useState(false); // 비밀번호 눈 모양 토글
  const [isCkVisible, setIsCkVisible] = useState(false); // 비밀번호 확인 눈 모양 토글
  const [validModal, setValidModal] = useState(false);

  const { register: authRegister } = useAuth();
  const router = useRouter();

  const watchPassword = watch("password");
  const isPwMatched = watchPassword === watch("ckPassword");

  useEffect(() => {
    // 폼 유효성 자동 체크
  }, [watchPassword, watch("ckPassword")]);

  const onSubmit = async (data) => {
    const { email, nickName, password, ckPassword } = data;

    try {
      const result = await authRegister(email, nickName, password, ckPassword);

      if (!result.accessToken) {
        alert("회원가입 실패");
        return;
      }

      // 로컬 스토리지에 token, nickname 저장
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("UserId", result.user.id);

      router.push("/items");
    } catch (e) {
      console.error("회원가입 실패", e);
      setValidModal(true);
    }
  };

  const togglePasswordVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const toggleCkPasswordVisibility = () => {
    setIsCkVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col font-[Pretendard] justify-center">
      <div className="flex flex-col items-center justify-center">
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

        <div className="w-[640px] flex flex-col items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            {/* 이메일 입력 */}
            <InputField
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register("email", {
                required: "이메일을 입력해주세요",
                validate: (value) =>
                  isValidEmail(value) || "유효하지 않은 이메일입니다.",
              })}
            />
            {errors.email && (
              <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                {errors.email.message}
              </div>
            )}

            {/* 닉네임 입력 */}
            <InputField
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              {...register("nickName", {
                required: "닉네임을 입력해주세요",
              })}
            />
            {errors.nickName && (
              <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                {errors.nickName.message}
              </div>
            )}

            {/* 비밀번호 입력 */}
            <div className="relative">
              <InputField
                label="비밀번호"
                type={isVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 4자 이상이어야 합니다.",
                  },
                  validate: (value) =>
                    isValidPassword(value) || "유효하지 않은 비밀번호입니다.",
                })}
              />
              <img
                src={
                  isVisible
                    ? "/image/signup/btn_visibility_on_24px.png"
                    : "/image/signup/btn_visibility_off_24px.png"
                }
                alt="비밀번호 보기 아이콘"
                className="absolute left-[600px] top-[58px] w-6 h-6"
                onClick={togglePasswordVisibility}
              />
              {errors.password && (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* 비밀번호 확인 입력 */}
            <div className="relative">
              <InputField
                label="비밀번호 확인"
                type={isCkVisible ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요"
                {...register("ckPassword", {
                  required: "비밀번호 확인을 입력해주세요",
                  validate: () =>
                    isPwMatched ? true : "비밀번호가 일치하지 않습니다.",
                })}
              />
              <img
                src={
                  isCkVisible
                    ? "/image/signup/btn_visibility_on_24px.png"
                    : "/image/signup/btn_visibility_off_24px.png"
                }
                alt="비밀번호 보기 아이콘"
                className="absolute left-[600px] top-[58px] w-6 h-6"
                onClick={toggleCkPasswordVisibility}
              />
              {errors.ckPassword && (
                <div className="text-[#f74747] font-semibold text-[15px] mt-2">
                  {errors.ckPassword.message}
                </div>
              )}
            </div>

            <Button text="회원가입" disabled={!isValid} />
          </form>

          <CompactLogin />

          <CrossSite
            text="이미 회원이신가요?"
            linkTo="/login"
            textClick="로그인"
          />
        </div>
      </div>

      {validModal && (
        <ValidModal
          text="사용중인 이메일입니다"
          onClose={() => setValidModal(false)}
        />
      )}
    </div>
  );
}

export default SignupPage;
