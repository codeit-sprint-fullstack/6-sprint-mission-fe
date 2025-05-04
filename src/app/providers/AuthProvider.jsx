"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe,updateMe,updateMyPassword,getMyProduct,getMyFavorites } from "@/src/api/user/user";
import { login,register,refreshToken } from "@/src/api/auth/auth";
const AuthContext = createContext({
  Login: () => {},
  Logout: () => {},
  Register: () => {},
  user: null,
  UpdateUser: () => {},
  UpdatePassword: () => {},
  MyProducts: () => {},
  MyFavorites: () => {},  
});

export const userService = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("userService must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const user = await getMe();
      setUser(user);
      if(user!==null){
      console.log("유저상태:",user)}
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const Register = async (data) => {
    await register(data);
  };

  const Login = async (data) => {
    const { accessToken } = await login(data);
    localStorage.setItem("accessToken", accessToken);
    await getUser();    
  };

  const Logout = async () => {    
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const UpdateUser = async (image) => {
    const updatedUser = await updateMe(image);
    setUser(updatedUser);
  };

  const UpdatePassword = async (data) => {
    const updatedUser = await updateMyPassword(data);
    setUser(updatedUser);
  };

  const MyProducts = async () => {    
    await getMyProduct();
  };

  const MyFavorites = async () => {
    await getMyFavorites();
    
  };




  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUser(); // accessToken 있을 때만 호출
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, Login, Logout, Register, UpdateUser,UpdatePassword, MyProducts, MyFavorites}}>
      {children}
    </AuthContext.Provider>
  );
}
