"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  login: () => {},
  logiout: () => {},
  updateUser: () => {},
  register: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);

      //디버깅
      console.log("user", user);
    } catch (e) {
      console.error("사용자 정보를 가져오는데 실패했습니다", e);
      setUser(null);
    }
  };

  const login = async (email, password) => {
    const result = await authService.login(email, password);

    //디버깅
    console.log("result", result);

    setUser(result.user);
    return result;
  };

  const register = async (name, email, password) => {
    await authService.register(name, email, password);
  };

  const logout = async () => {
    console.log("로그아웃!");
  };

  const updateUser = async (user) => {
    console.log("유저 업데이트!");
  };

  //새로고침 시 로그인 상태 유지
  useEffect(() => {
    getUser();
    console.log("화면 새로 고침");
    // const storedToken = localStorage.getItem("accessToken");
    // if (storedToken) setAccessToken(storedToken);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, updateUser, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
