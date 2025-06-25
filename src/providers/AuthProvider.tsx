"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthTokens } from "@/types";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  nickname: string | null;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedNickname = localStorage.getItem("nickname");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    if (storedNickname) setNickname(storedNickname);
  }, []);

  const login = ({ accessToken, refreshToken, nickname }: AuthTokens) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setNickname(nickname);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("nickname", nickname);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setNickname(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, nickname, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 