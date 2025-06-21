import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { TPassword } from "@/types";

interface TogglePasswordProps {
  showPassword: TPassword;
  setShowPassword: (value: TPassword) => void;
  name: keyof TPassword;
}

function TogglePassword({
  showPassword,
  setShowPassword,
  name,
}: TogglePasswordProps) {
  const togglePassword = (name: keyof TPassword) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };
  return (
    <button
      className="text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2"
      type="button"
      onClick={() => togglePassword(name)}
    >
      {showPassword[name] ? <EyeOff /> : <Eye />}
    </button>
  );
}

export default TogglePassword;
