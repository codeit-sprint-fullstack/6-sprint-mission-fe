"use client";

interface SignUpModalProps {
  message: string;
  onClose: () => void;
}

export default function SignUpModal({ message, onClose }: SignUpModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white w-[530px] h-[250px] rounded-xl shadow-xl p-6 text-center space-y-10 flex flex-col justify-center items-center">
        <p className="text-gray-800 font-medium text-lg">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md w-[165px] h-[48px]"
        >
          확인
        </button>
      </div>
    </div>
  );
} 