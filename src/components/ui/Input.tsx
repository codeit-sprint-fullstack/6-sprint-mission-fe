import EyeInvisible from "@/assets/svgs/eye_invisible.svg";
import EyeVisible from "@/assets/svgs/eye_visible.svg";
import { forwardRef, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, type, placeholder, error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="relative flex flex-col gap-1">
        <label htmlFor={name} className="text-sm font-bold">
          {label}
        </label>
        <input
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          ref={ref}
          className={`mt-2 rounded-xl bg-gray-100 px-6 py-4 ${
            error && "!outline-error-red !focus:outline-none outline"
          }`}
          {...rest}
        />
        {error && <div className="text-error-red mt-2 ml-4 text-sm font-semibold">{error}</div>}
        <button
          type="button"
          className="absolute top-12 right-6"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {isPassword &&
            (showPassword ? (
              <EyeVisible alt="비밀번호 보기" />
            ) : (
              <EyeInvisible alt="비밀번호 숨김" />
            ))}
        </button>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
