"use client";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";

interface LogoutModalProps {
  setIsModalOpen: (value: boolean) => void;
}

function LogoutModal({ setIsModalOpen }: LogoutModalProps) {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
  };
  return (
    <div className="z-500 fixed inset-0 bg-black/70 flex items-center justify-center ">
      <div className="w-80 h-55 bg-white rounded-xl flex justify-center items-center flex-col opacity-100">
        <p className="text-gray-800">로그아웃 하시겠습니까?</p>
        <div className="flex gap-2 h-12 mt-8">
          <button
            className="border border-primary-100 text-primary-100 w-22 h-12 rounded-lg font-semibold"
            onClick={() => setIsModalOpen(false)}
          >
            취소
          </button>
          <button
            onClick={handleLogout}
            className="bg-primary-100 text-white w-22 h-12  rounded-lg font-semibold"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
