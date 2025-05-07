"use client";

import { MdCheckCircle } from "react-icons/md";

export default function DeleteConfirmModal({ onConfirm, onCancel, message }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-80 text-center">
        <MdCheckCircle className="text-red-500 text-3xl mx-auto mb-4" />{" "}
        <p className="text-gray-800 font-semibold mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-8 py-2 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
