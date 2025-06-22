"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { User, LoginRequest, SignupRequest } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (
    credentials: LoginRequest
  ) => Promise<{ accessToken: string; user: User }>;
  signup: (credentials: SignupRequest) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  getMe: (accessToken: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // 토큰 만료 확인 함수
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      return (decoded as any).exp < now + 10;
    } catch (e) {
      return true;
    }
  };

  // accessToken과 user 설정 + localStorage 저장
  const setTokenAndUser = (token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
    localStorage.setItem("accessToken", token);
  };

  // 로그인
  const login = async ({
    email,
    password,
  }: LoginRequest): Promise<{ accessToken: string; user: User }> => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("로그인 실패");

    const data = await res.json();
    const { accessToken, ...userData } = data;

    if (!accessToken) throw new Error("accessToken이 응답에 없습니다.");

    setTokenAndUser(accessToken, userData);
    localStorage.setItem("hasLoggedIn", "true");

    return { accessToken, user: userData };
  };

  // 회원가입
  const signup = async ({
    email,
    password,
    name,
  }: SignupRequest): Promise<void> => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) throw new Error("회원가입 실패");
  };

  // 토큰 갱신
  const refreshAccessToken = async (): Promise<void> => {
    console.log("🔄 refreshAccessToken 실행됨");
    try {
      const res = await fetch(`${BASE_URL}/token/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("토큰 갱신 실패");

      const data = await res.json();
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
    }
  };

  // 로그아웃
  const logout = (): void => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  // 유저 확인
  const getMe = async (accessToken: string): Promise<User> => {
    try {
      const response = await fetch(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("유저 정보 가져오기 실패");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("getMe 에러:", error);
      throw error;
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const hasLoggedIn = localStorage.getItem("hasLoggedIn");

    if (savedToken) {
      setAccessToken(savedToken);

      try {
        const decoded = jwtDecode(savedToken);
        const now = Date.now() / 1000;

        if ((decoded as any).exp && (decoded as any).exp < now + 10) {
          console.log("⌛ accessToken 만료(또는 곧 만료) → refresh 시도");
          refreshAccessToken();
        }
      } catch (error) {
        console.warn("❌ accessToken decode 실패 → refresh 시도");
        refreshAccessToken();
      }
    } else if (hasLoggedIn === "true") {
      console.log("🔍 accessToken 없음 + 로그인 기록 있음 → refresh 시도");
      refreshAccessToken();
    } else {
      console.log(
        "🚫 accessToken도 없고 로그인 기록도 없음 → refresh 시도 안 함"
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        signup,
        logout,
        refreshAccessToken,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
