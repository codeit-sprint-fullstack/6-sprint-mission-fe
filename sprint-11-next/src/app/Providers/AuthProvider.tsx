"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getMe,
  updateMe,
  updateMyPassword,
  getMyProduct,
  getMyFavorites,
} from "@/api/user/user";

type Props = { children: ReactNode };
type Login = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};
type User = {
  id: number;
  image?: string;
  nickname: string;
  updatedAt?: string;
  createdAt?: string;
};

type passwordChange = {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
};

import { login, register, refreshToken } from "@/api/auth/auth";
type AuthContextType = {
  user: User | null;
  Login: (data: Pick<Login, "email" | "password">) => Promise<void>;
  Logout: () => void;
  Register: (data: Login) => Promise<void>;
  UpdateUser: (data: { image: string }) => Promise<void>;
  UpdatePassword: (data: passwordChange) => Promise<void>;
  MyProducts: (data: { params?: number }) => Promise<void>;
  MyFavorites: (data: { params?: number }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const userService = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("userService must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const getUser = async () => {
    try {
      const user: User = await getMe();

      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  const Register = async (data: Login) => {
    await register(data);
  };

  const Login = async (data: Pick<Login, "email" | "password">) => {
    const { accessToken, refreshToken } = await login(data); // ✅ 둘 다 받기
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken); // ✅ 추가
    await getUser();
  };

  const Logout = async () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const UpdateUser = async ({ image }: { image: string }) => {
    const updatedUser = await updateMe({ image });
    setUser(updatedUser);
  };

  const UpdatePassword = async (data: passwordChange) => {
    const updatedUser = await updateMyPassword(data);
    setUser(updatedUser);
  };

  const MyProducts = async ({ params }: { params?: number }) => {
    await getMyProduct({ params });
  };

  const MyFavorites = async ({ params }: { params?: number }) => {
    await getMyFavorites({ params });
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUser(); // accessToken 있을 때만 호출
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        Login,
        Logout,
        Register,
        UpdateUser,
        UpdatePassword,
        MyProducts,
        MyFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
