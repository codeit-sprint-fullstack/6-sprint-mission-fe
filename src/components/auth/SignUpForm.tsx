"use client";

import React, { useEffect, useState } from "react";
import SocialLogin from "./SocialLogin";
import AuthInput from "../ui/auth/AuthInput";
import BtnPrimary from "../common/BtnPrimaryBig";
import AreYouAlreadyAMember from "../common/AreYouAlreadyAMember";
import { useRouter } from "next/navigation";
import { useAuth } from "../../provider/AuthProvider";
import Modal from "../modal/Modal";
import { loginAction } from "../../lib/actions/auth";
import { User } from "@/app/types";


function SignUpForm() {
	const [email, setEmail] = useState<string>("");
	const [nickname, setNickname] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [isEmailValid, setIsEmailValid] = useState<string | null>();
	const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<string | null>();
	const { setUser } = useAuth();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [btnLabel, setBtnLabel] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const signupValid =
		email.includes("@") &&
		nickname.length > 0 &&
		password === confirmPassword &&
		password.length > 0;

	// 이메일 유효성 검사
	useEffect(() => {
		if (email.length > 0 && !email.includes("@")) {
			setIsEmailValid("wrongType");
		}
	}, [email]);

	// 비밀번호 유효성 검사
	useEffect(() => {
		if (!password || !confirmPassword) {
			setIsConfirmPasswordValid(null);
		} else if (password !== confirmPassword) {
			setIsConfirmPasswordValid("wrongType");
		} else if (password.length < 8) {
			setIsConfirmPasswordValid("length");
		}
	}, [password, confirmPassword]);

	// 회원가입 버튼 클릭 후 모달 오픈
	const openModal = (type : "success" | "", errorMessage?: string) : void => {
		setIsOpen(true);
		setBtnLabel("확인");
		if (type === "success") {
			setComment("회원가입 성공");
		}
		if (errorMessage) {
			setComment(errorMessage);
		}
	};

	const router = useRouter();
	const [isSummiting, setIsSummiting] = useState<boolean>(false);
	const handleSignup = async (e:any) => {
		e.preventDefault();
		if (isSummiting) return; // 중복클릭 방지
		setIsSummiting(true);
		console.log(
			"요청 url",
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signUp`
		);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signUp`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email,
						nickname,
						password,
						passwordConfirmation: confirmPassword,
					}),
				}
			);

			if (res.ok) {
				//const data = await res.json();
				const data = await loginAction({ email, password });
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
				setUser(data.user);
				openModal("success");
			} else {
				const errorData = await res.json();
				console.error("❌ 회원가입 실패 응답:", errorData);
				openModal(
					"",
					errorData.message || errorData.error || "회원가입 실패"
				);
			}
		} catch (error: unknown) {
			if(error instanceof Error) {
				console.error("🔥 서버 오류 상세:", error);
				alert(error.message);
			}else {
				alert(String(error)); // 기타 타입도 문자열로 출력
			}
		} finally {
			setIsSummiting(false);
		}
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		if (comment === "회원가입 성공") {
			router.push("/items");
		}
	};

	return (
		<div className="w-full mt-8 md:mt-14 px-4 ">
			<form className="flex flex-col gap-6" onSubmit={handleSignup}>
				<AuthInput
					type="text"
					title="이메일"
					placeholder="이메일을 입력해 주세요"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					errorType={isEmailValid ? undefined : "wrongType"}
				/>
				<AuthInput
					type="text"
					title="닉네임"
					placeholder="닉네임을 입력해 주세요"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
				/>
				<AuthInput
					type="password"
					title="비밀번호"
					placeholder="비밀번호를 입력해 주세요"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<AuthInput
					type="password"
					title="비밀번호 확인"
					placeholder="비밀번호를 다시 한 번 입력해 주세요"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					errorType={isConfirmPasswordValid? undefined : "wrongType"}
				/>
				<BtnPrimary
					type="submit"
					text="text-xl"
					disabled={!signupValid}
				>
					회원가입
				</BtnPrimary>
			</form>
			<SocialLogin />
			<AreYouAlreadyAMember pageType="signup" />
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

export default SignUpForm;
