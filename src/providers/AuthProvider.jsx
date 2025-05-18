"use client";

import { authService } from "@/service/authService";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext({
  user: null,
  signUp: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 반드시 AuthProvider안에서 사용해야 합니다.");
  }

  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 유저 정보
  const getUser = async () => {
    const user = await authService.getUser();

    setUser(user);
  };

  // 회원가입
  const signUp = async (email, nickname, password) => {
    const user = await authService.signUp(email, nickname, password);

    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);

    await getUser();
  };

  // 로그인
  const login = async (email, password) => {
    const user = await authService.login(email, password);

    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken);

    await getUser();
  };

  // 로그아웃
  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
