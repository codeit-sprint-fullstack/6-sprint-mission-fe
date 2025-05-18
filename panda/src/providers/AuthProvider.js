/**
 * 미완성임!! (=모르겠음)
 */

"use client";

import { postSignIn } from "@/api/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

// 1. 만든다
const AuthContext = createContext();

// 2. 사용한다
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { accessToken, nickname, image } = await postSignIn({
        email,
        password,
      });
      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken);
      setUser({ nickname, image });
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
