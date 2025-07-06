"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { signupSchema } from "@/schemas/auth.schema";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import SubmitButton from "@/components/ui/SubmitButton";

type FormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>("");
  const [isSignupSuccess, setIsSignupSuccess] = useState<boolean>(false);

  const router = useRouter();
  const { signup } = useAuth();

  const onSubmit = async (data: FormValues) => {
    const result = await signup(
      data.email,
      data.nickname,
      data.password,
      data.passwordConfirmation
    );
    setIsSignupSuccess(result.success!);
    setModalMsg(result.message);
    setIsModalOpen(true);
  };

  const handleModalClick = () => {
    if (isSignupSuccess) {
      router.push("/login");
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해주세요"
        {...register("nickname")}
        error={errors.nickname?.message}
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...register("password")}
        error={errors.password?.message}
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요"
        {...register("passwordConfirmation")}
        error={errors.passwordConfirmation?.message}
      />
      <SubmitButton isValid={isValid} type="회원가입" />
      {isModalOpen && <Modal message={modalMsg} handleClick={handleModalClick} />}
    </form>
  );
}
