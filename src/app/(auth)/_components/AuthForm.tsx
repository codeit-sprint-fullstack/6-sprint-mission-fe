// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import AuthFooter from "./AuthFooter";

// function AuthForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   return (
//     <form
//       onSubmit={handleSubmit((data) => console.log(data))}
//       className="flex flex-col gap-4"
//     >
//       <label className="text-sm font-bold">
//         이메일
//         <input
//           {...register("email", { required: "잘못된 이메일 형식입니다." })}
//           placeholder="이메일을 입력해주세요"
//         />
//       </label>
//       <p>{errors.email?.message}</p>
//       <label className="text-sm font-bold">
//         닉네임
//         <input
//           {...register("nickname", { required: "닉네임을 입력해주세요" })}
//           placeholder="닉네임을 입력해주세요"
//         />
//       </label>
//       <p>{errors.nickname?.message}</p>

//       <label className="text-sm font-bold">
//         비밀번호
//         <input
//           {...register("password", {
//             required: "비밀번호를 입력해주세요",
//             minLength: {
//               value: 8,
//               message: "비밀번호를 8자 이상 입력해주세요",
//             },
//           })}
//           placeholder="비밀번호를 입력해주세요"
//         />
//       </label>
//       <p>{errors.password?.message}</p>

//       <label className="text-sm font-bold">
//         비밀번호 확인
//         <input
//           {...register("passwordConfirmation", {
//             required: "비밀번호가 일치하지 않습니다",
//           })}
//           placeholder="비밀번호를 다시 한 번 입력해주세요"
//         />
//       </label>
//       <p>{errors.passwordConfirmation?.message}</p>

//       <button
//         type="submit"
//         className="btn-base rounded-[40px] h-[56px] text-xl font-semibold"
//       >
//         회원가입
//       </button>
//       <AuthFooter />
//     </form>
//   );
// }

// export default AuthForm;
