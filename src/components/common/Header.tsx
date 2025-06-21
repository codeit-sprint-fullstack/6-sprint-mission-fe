"use client";

import React, { useEffect, useState } from "react";
import Menu from "../ui/Menu";
import BtnPrimarySmall from "../ui/article/BtnPrimarySmall";
import H1Title from "./H1Title";
import Image from "next/image";
import ic_profile from "../../app/images/ic_profile.png";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";



function Header() {
	const { user, setUser, logout } = useAuth();
	const router = useRouter();

	// if (user === null) {
	//   // 아직 user 정보를 불러오는 중이면 (처음 로딩 상태)
	//   return (
	//     <div>로딩중...</div>
	//   );
	// }

	return (
		<div className="border-1 border-[#dfdfdf] flex fixed bg-[#ffffff] h-17.5 top-0 right-0 left-0 z-50">
			<div
				className={`
					max-w-screen-xl 
					min-w-screen-m 
					mx-auto 
					flex 
					fixed
					items-center 
					sm:px-4 
					h-17.5
					top-0 right-0 left-0
				`}
			>
				<H1Title />
				<Menu />
				<div>
					{user ? (
						<div className="flex justify-between gap-2 items-center">
							<Image
								src={ic_profile}
								alt="프로필 이미지"
								className="w-10 h-10"
							/>
							{user.nickname}
							<BtnPrimarySmall
								onClick={async () => {
									await logout();
									router.replace("/login");
								}}
							>
								로그아웃
							</BtnPrimarySmall>
						</div>
					) : (
						<BtnPrimarySmall onClick={() => router.push("/login")}>
							로그인
						</BtnPrimarySmall>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
