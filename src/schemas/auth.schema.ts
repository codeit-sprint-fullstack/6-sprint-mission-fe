import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("잘못된 이메일 형식입니다."),
  password: z.string().min(8, "비밀번호를 8자 이상 입력해주세요."),
});

export const signupSchema = loginSchema
  .extend({
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
    passwordConfirmation: z.string().min(8, "비밀번호를 8자 이상 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });
