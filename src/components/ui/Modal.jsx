"use client";

import React from "react";

export default function Modal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">
        <p className="text-gray-800 text-lg font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-700"
        >
          확인
        </button>
      </div>
    </div>
  );
}
