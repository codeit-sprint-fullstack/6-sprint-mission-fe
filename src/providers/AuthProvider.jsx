"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/api/authService";
import { userService } from "@/api/userService";
import { jwtDecode } from "jwt-decode";

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
  const [refreshTimeout, setRefreshTimeout] = useState(null);

  const setupRefreshToken = (accessToken) => {
    if (!accessToken) return;

    const payload = jwtDecode(accessToken);
    const now = Date.now() / 1000;
    const expiresIn = payload.exp - now;

    // if (expiresIn <= 60) {
    //   logout();
    //   return;
    // }

    if (refreshTimeout) clearTimeout(refreshTimeout);

    const timeoutMs = Math.max((expiresIn - 60 * 14) * 1000); // 1분 전 재발급
    const timeout = setTimeout(async () => {
      try {
        const newAccessToken = await authService.getRefreshToken();
        setupRefreshToken(newAccessToken);
        console.log("토큰 갱신 성공", newAccessToken);
      } catch (err) {
        console.error("토큰 갱신 실패", err);
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
      setUser(null);
    }
  };

  const register = async (email, nickname, password, passwordConfirmation) => {
    await authService.signUp(email, nickname, password, passwordConfirmation);
  };

  const login = async ({ email, password }) => {
    await authService.signIn(email, password);
    await getUser();
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (user) => {
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
