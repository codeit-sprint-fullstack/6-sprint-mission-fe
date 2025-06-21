"use client";

import React, { useState, useEffect } from "react";
import SocialLogin from "@/components/auth/SocialLogin";
import AuthInput from "@/components/ui/auth/AuthInput";
import BtnPrimary from "@/components/common/BtnPrimaryBig";
import AreYouAlreadyAMember from "@/components/common/AreYouAlreadyAMember";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal/Modal";
import { loginAction } from "@/lib/actions/auth";
import { useAuth } from "@/provider/AuthProvider";

export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isSummiting, setIsSummiting] = useState<boolean>(false);
	const btnPrimaryValid = email.includes("@") && password.length > 0;
	const [isEmailValid, setIsEmailValid] = useState<string>("");
	const [isPasswordValid, setIsPasswordValid] = useState<string>("");
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [btnLabel, setBtnLabel] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const { setUser } = useAuth();

	const openModal  = (type: string, errorMessage?: string) : void => {
		setIsOpen(true);
		setBtnLabel("확인");
		if (type === "success") {
			setComment("로그인 성공");
		}
		if (errorMessage) {
			setComment(errorMessage);
		}
	};

	const handleLogin = async (e : React.FormEvent<HTMLFormElement>) : Promise<void> => {
		e.preventDefault();
		if (isSummiting) return;
		setIsSummiting(true);

		try {
			const data = await loginAction({ email, password });
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("refreshToken", data.refreshToken);
			setUser(data.user);
			openModal("success");
		} catch (error) {
			let errorMessage = "회원가입 실패";
			if (error && typeof error === "object" && "message" in error) {
			// error가 Error 객체이거나, 서버에서 message를 반환하는 경우
			errorMessage = (error as any).message || errorMessage;
			}
			console.error("🔥 서버 오류 상세:", error);
			openModal("", errorMessage);
		} finally {
			setIsSummiting(false);
		}
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		if (comment === "로그인 성공") {
			router.push("/items");
		}
	};

	return (
		<div className="w-full mt-8 md:mt-14 px-4 ">
			<form className="flex flex-col gap-6" onSubmit={handleLogin}>
				<AuthInput
					type="text"
					title="이메일"
					placeholder="이메일을 입력해 주세요"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					errorType={isEmailValid ? undefined : "wrongType"}
				/>
				<AuthInput
					type="password"
					title="비밀번호"
					placeholder="비밀번호를 입력해 주세요"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					errorType={isPasswordValid ? undefined : "wrongType"}
				/>
				<BtnPrimary
					type="submit"
					text="text-xl"
					disabled={!btnPrimaryValid}
				>
					{isSummiting ? "로그인 중..." : " 로그인"}
				</BtnPrimary>
			</form>
			<SocialLogin />
			<AreYouAlreadyAMember pageType="login" />

			{isOpen && (
				<Modal
					text={comment}
					btnLabel={btnLabel}
					onClick={handleCloseModal}
				/>
			)}
		</div>
	);
}
