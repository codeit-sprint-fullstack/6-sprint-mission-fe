"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isValidEmail, isValidPassword } from "../../../utils/isValid";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [ckPassword, setCkPassword] = useState("");

  const [isFormsValid, setIsFormsValid] = useState(false);

  const router = useRouter();

  //비밀번호 일치 여부
  const isPwMatched = password === ckPassword;

  useEffect(() => {
    const isEmailValid = isValidEmail(email);
    const isNicknameValid = nickName.trim().length > 0;
    const isPwValid = isValidPassword(password);

    setIsFormsValid(
      isEmailValid && isNicknameValid && isPwValid && isPwMatched
    );
  }, [email, nickName, password, ckPassword]);

  const handleSignup = async () => {
    console.log("email", email);
    console.log("nickName", nickName);
    console.log("password", password);
    console.log("ckPassword", ckPassword);

    try {
      const response = await fetch(
        "https://panda-market-api.vercel.app/auth/signUp",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            nickname: nickName,
            password: password,
            passwordConfirmation: ckPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      // const result = await register({ email, nickName, password, ckPassword });

      //디버깅
      console.log("회원가입 성공");
      console.log("result", result);

      router.push("/market");

      // return response.json();
    } catch (e) {
      //모달로 구현할 것
      alert("실패했습니다", e.message);
    }
  };

  return (
    <div className="font-[Pretendard] m-0 p-0">
      <main className="flex flex-col items-center justify-center pt-[60px]">
        <div className="w-[396px] h-[132px] px-[122px] pb-[40px] flex justify-center">
          <img
            className="w-[103.53px] h-[103.88px] pt-[12.98px] pb-[15.14px] pr-[22.24px]"
            // src="/signup/판다 얼굴.png"
            alt="판다 얼굴"
          />
          <span className="pt-[33px] w-[266px] h-[90px]">
            <img
              // src="/signup/판다마켓.png"
              alt="판다마켓"
            />
          </span>
        </div>

        <div className="w-[640px] flex flex-col items-center">
          <form onSubmit={handleSignup}>
            {/* 이메일 */}
            <div className="w-[640px] h-[98px]">
              <label
                htmlFor="input-email"
                className="block text-[18px] font-bold leading-[26px] pb-[16px] pr-[593px]"
              >
                이메일
              </label>
              <input
                type="email"
                id="input-email"
                placeholder="이메일을 입력해주세요"
                className="w-[640px] h-[56px] bg-gray-100 text-gray-400 rounded-[10px] border-0 pl-[20px] mt-[5px]
                  font-normal text-[16px] leading-[26px] focus:outline-none focus:border-[#3692ff] focus:border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div
                className="w-[154px] h-[18px] pt-[8px] pr-[470px] pl-[16px] text-[#f74747] font-semibold text-[15px] leading-[17.9px]"
                id="email-error-message"
              ></div>
            </div>

            {/* 닉네임 */}
            <div className="w-[640px] h-[98px] pt-[24px]">
              <label
                htmlFor="input-nickname"
                className="block text-[18px] font-bold leading-[26px] pb-[16px] pr-[577px]"
              >
                닉네임
              </label>
              <input
                type="text"
                id="input-nickname"
                placeholder="닉네임을 입력해주세요"
                className="w-[640px] h-[56px] bg-gray-100 text-gray-400 rounded-[10px] border-0 pl-[20px] mt-[5px]
                  font-normal text-[16px] leading-[26px] focus:outline-none focus:border-[#3692ff] focus:border"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </div>

            {/* 비밀번호 */}
            <div className="w-[640px] h-[98px] pt-[24px] relative">
              <label
                htmlFor="input-password"
                className="block text-[18px] font-bold leading-[26px] pb-[16px] pr-[577px]"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="input-password"
                placeholder="비밀번호를 입력해주세요"
                className="w-[640px] h-[56px] bg-gray-100 text-gray-400 rounded-[10px] border-0 pl-[20px] mt-[5px]
                  font-normal text-[16px] leading-[26px] focus:outline-none focus:border-[#3692ff] focus:border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                // src="/signup/btn_visibility_off_24px.png"
                alt="비밀번호 보기"
                className="absolute top-[69px] left-[610px]"
              />
              <div
                className="w-[154px] h-[18px] pt-[8px] pr-[470px] pl-[16px] text-[#f74747] font-semibold text-[15px] leading-[17.9px]"
                id="password-error-message"
              ></div>
            </div>

            {/* 비밀번호 확인 */}
            <div className="w-[640px] h-[98px] pt-[24px] pb-[24px] relative">
              <label
                htmlFor="input-checkpassword"
                className="block text-[18px] font-bold leading-[26px] pb-[16px] pr-[577px]"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="input-checkpassword"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                className="w-[640px] h-[56px] bg-gray-100 text-gray-400 rounded-[10px] border-0 pl-[20px] mt-[5px]
                  font-normal text-[16px] leading-[26px] focus:outline-none focus:border-[#3692ff] focus:border"
                value={ckPassword}
                onChange={(e) => setCkPassword(e.target.value)}
              />
              <img
                // src="/signup/btn_visibility_off_24px.png"
                alt="비밀번호 보기"
                className="absolute top-[69px] left-[610px]"
              />
              {isPwMatched ? null : <div> 비밀번호가 일치하지 않아요. </div>}
            </div>

            {/* 회원가입 버튼 */}
            <button
              className={`text-[20px] w-[640px] h-[56px] my-[50px] rounded-full font-semibold ${
                isFormsValid
                  ? "text-third bg-primary"
                  : "text-third bg-fifth cursor-not-allowed"
              }`}
              disabled={!isFormsValid}
              type="submit"
            >
              회원가입
            </button>

            {/* 소셜 로그인 */}
            <div className="w-[640px] h-[74px] bg-[#e6f2ff] flex justify-center mt-[24px]">
              <div className="w-[594px] h-[42px] flex items-center justify-between px-[23px] py-[16px]">
                <div className="text-[16px] leading-[26px] w-[101px] h-[26px] font-medium py-[8px]">
                  간편 로그인하기
                </div>
                <div className="w-[100px] h-[42px] flex flex-row justify-between">
                  <a href="https://www.google.com/">
                    <img
                      // src="/signup/Component 2@3x.png"
                      width="42"
                      height="42"
                      alt="구글 로그인"
                    />
                  </a>
                  <a href="https://www.kakaocorp.com/page/">
                    <img
                      // src="/signup/Component 3@3x.png"
                      width="42"
                      height="42"
                      alt="카카오 로그인"
                    />
                  </a>
                </div>
              </div>
            </div>
          </form>

          <div className="flex flex-row justify-center items-end h-[48px] mt-[16px]">
            <div className="w-[108px] h-[24px] text-[14px] pr-[5px]">
              이미 회원이신가요?
            </div>
            <div className="w-[39px] h-[24px] text-[14px] text-blue-600">
              <Link href="/login">로그인</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
