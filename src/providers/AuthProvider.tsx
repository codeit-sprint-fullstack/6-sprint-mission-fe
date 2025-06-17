"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/api/auth/auth.client";
import { userService } from "@/api/userService";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  updateUser: (user: User) => Promise<void>;
  register: (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: async () => {},
  user: null,
  updateUser: async () => {},
  register: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);
  const [refreshTimeout, setRefreshTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // ✅ 클라이언트에서는 JWT 슬라이딩 세션의 트리거 역할만 수행하면 됨
  // 서버는 refreshToken의 남은 시간을 판단해 필요시 재발급 처리함
  // 트리거는 아래와 같이 여러 방식이 가능:
  // - API 요청 시
  // - 사용자 이벤트 발생 시 (e.g., click, keydown)
  // - setTimeout 기반 주기적 호출 등

  const setupRefreshToken = (accessToken: string) => {
    if (!accessToken) return;

    const payload = jwtDecode(accessToken);
    const now = Date.now() / 1000;
    const expiresIn = payload.exp! - now;

    if (refreshTimeout) clearTimeout(refreshTimeout);

    // accessToken 만료 14분 전에 재발급 시도 (테스트용)
    // (주로 서버 만료 시간 1~2분전에 재발급 시도, 15분 기준 )

    // const timeoutMs = Math.max((expiresIn - 60) * 1000); // 실제 배포용 - 만료 1분전
    const timeoutMs = Math.max((expiresIn - 60 * 14) * 1000); // 테스트용 - 만료 14분전

    const timeout: NodeJS.Timeout = setTimeout(async () => {
      try {
        const newAccessToken = await authService.getRefreshToken();
        setupRefreshToken(newAccessToken); // 새 토큰으로 타이머 갱신
        // console.log("🟢 새로운 토큰 갱신 등록 성공", newAccessToken);
      } catch (err) {
        console.error("🔴 토큰 갱신 실패", err);
        logout();
      }
    }, timeoutMs);

    setRefreshTimeout(timeout);
  };

  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setUser(null);
        return;
      }

      const user = await userService.getMe();
      setUser(user);
      setupRefreshToken(accessToken);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      logout();
      setUser(null);
    }
  };

  const register = async (
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string
  ) => {
    await authService.signUp(email, nickname, password, passwordConfirmation);
  };

  const login = async (email: string, password: string) => {
    await authService.signIn(email, password);
    await getUser();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (user: User) => {
    const updatedUser = await userService.updateMe(user);
    setUser(updatedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}
