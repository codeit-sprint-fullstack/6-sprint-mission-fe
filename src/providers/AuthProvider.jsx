"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedNickname = localStorage.getItem("nickname");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
    if (storedNickname) setNickname(storedNickname);
  }, []);

  const login = ({ accessToken, refreshToken, nickname }) => {
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

export function useAuth() {
  return useContext(AuthContext);
}
