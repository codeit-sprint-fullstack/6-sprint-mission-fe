"use client";

import { signUp, signIn, signOut } from "@/api/auth.api";
import { getMyUserInfo, updateMyUserInfo } from "@/api/user.api"; 
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  updateUser: () => {},
  register: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const userData = await getMyUserInfo(); // 수정: userService.getMe() → getMyUserInfo()
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
      // 토큰이 유효하지 않으면 제거
      localStorage.removeItem("accessToken");
    }
  };

  const register = async (nickname, email, password, passwordConfirmation) => {
    // 수정: authService.register() → signUp() 직접 호출
    if (password !== passwordConfirmation) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    await signUp({ email, nickname, password });
  };

  const login = async (email, password) => {
    // 수정: authService.login() → signIn() 직접 호출
    const response = await signIn({ email, password });
    
    // 액세스 토큰 저장
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
    }
    
    await getUser();
  };

  const logout = async () => {
    // 수정: authService.logout() → signOut() 직접 호출
    signOut();
    setUser(null);
  };

  const updateUser = async (userData) => {
    // 수정: userService.updateMe() → updateMyUserInfo() 직접 호출
    const updatedUser = await updateMyUserInfo(userData);
    setUser(updatedUser);
  };

  useEffect(() => {
    // 토큰이 있으면 사용자 정보 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}