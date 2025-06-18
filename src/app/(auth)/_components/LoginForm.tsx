"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import SubmitButton from "@/components/ui/SubmitButton";

type FormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMsg, setModalMsg] = useState<string>("");

  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data: FormValues) => {
    const result = await login(data.email, data.password);
    if (result?.success) {
      router.push("/items");
    } else {
      setModalMsg(result?.message);
      setIsModalOpen(true);
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
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...register("password")}
        error={errors.password?.message}
      />
      <SubmitButton isValid={isValid} type="로그인" />
      {isModalOpen && <Modal message={modalMsg} handleClick={() => setIsModalOpen(false)} />}
    </form>
  );
}
