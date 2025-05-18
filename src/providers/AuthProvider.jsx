"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, nickname, password, passwordConfirmation) => {
    const res = await authService.signUp({
      email,
      nickname,
      password,
      passwordConfirmation,
    });

    if (res.accessToken) {
      localStorage.setItem("accessToken", res.accessToken);
      setUser(res.user);
    }

    return res;
  };

  const login = async (email, password) => {
    const res = await authService.signIn(email, password);
    if (res.accessToken) {
      localStorage.setItem("accessToken", res.accessToken);
      setUser(res.user);
    }
    return res;
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");

    setUser(null);

    router.push("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
