'use client'

import React from 'react'

type ErrorCommentKey = "email" | "password" | "";
type ErrorType = "wrongType" | "notAMember" | "length" | "null";
type errorComment = {
  email : {
    wrongType : string | null;
    notAMember : string | null;
    null : string | null;
  },
  password : {
    wrongType: string | null;
    length: string | null;
    null : string | null;
  },
}

const errorComment : errorComment = {
  email : {
    wrongType : "올바른 이메일 형식이 아닙니다", 
    notAMember : "존재하지 않는 이메일입니다",
    null : ""
  },
  password : {
    wrongType: "비밀번호가 일치하지 않습니다",
    length: "비밀번호는 8자 이상이어야 합니다",
    null : ""
  },
}

interface AuthInputProps {
  title: "닉네임" | "이메일" | "비밀번호" | "비밀번호 확인" | "email" | "password" | ""; 
  type: "text"  | "password" ; 
  placeholder: string; 
  value: string; 
  onChange: React.ChangeEventHandler<HTMLInputElement>; 
  errorType?: ErrorType | undefined;
}

export default function AuthInput({ type, title, placeholder, value, onChange, errorType} : AuthInputProps) {

  const errorCommentKey: ErrorCommentKey =
    title === "이메일" ? "email"
    : title === "비밀번호" || title === "비밀번호 확인" ? "password"
    : "";

  let errorMessage = "";
  if (errorCommentKey === "email" && errorType && errorType in errorComment.email) {
  errorMessage = errorComment.email[errorType as keyof typeof errorComment.email] ?? "";
  } else if (errorCommentKey === "password" && errorType && errorType in errorComment.password) {
    errorMessage = errorComment.password[errorType as keyof typeof errorComment.password] ?? "";
  }
  return (
    <div className="flex flex-col gap-4">
        <div className="text-lg font-[700]">{title}</div>
        <input
          type={type} 
          className="w-full bg-gray-100 py-4 px-6 rounded-md" 
          placeholder={placeholder}
          onChange ={onChange} 
          value={value} 
        ></input>
        {errorMessage && (
        <div className="text-sm font-bold text-red-600 px-4">{errorMessage}</div> )
        }
    </div>
  )
}
