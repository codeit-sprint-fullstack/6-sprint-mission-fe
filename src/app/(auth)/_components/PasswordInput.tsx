import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  label = "비밀번호",
  placeholder = "비밀번호를 입력해주세요",
  value,
  onChange,
  onBlur,
  error,
  showPassword,
  toggleShowPassword,
  name = "password",
  minLength = 8,
}: {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
  name?: string;
  minLength?: number;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="font-bold text-[#1f2937]">{label}</span>
      <div className="relative flex">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required
          minLength={minLength}
          className={`h-[56px] w-full rounded-[12px] bg-[#f3f4f6] p-[15px] ${
            error
              ? "border border-[#FF585D]"
              : "border-none focus:border focus:border-[#FF585D] focus:outline-none"
          }`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />
        <button
          type="button"
          className="absolute top-1/2 right-0 flex h-full w-[50px] -translate-y-1/2 transform cursor-pointer items-center justify-center border-none bg-transparent text-[#979797]"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      <span className="ml-[15px] text-[0.8rem] font-bold text-[#FF585D]">
        {error}
      </span>
    </div>
  );
}
