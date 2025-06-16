export default function FormInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = true,
  minLength,
  hasIcon = false,
  showPassword,
  onTogglePassword,
  name,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: string;
  required?: boolean;
  minLength?: number;
  hasIcon?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  name: string;
}) {
  return (
    <div className="flex flex-col gap-[10px]">
      <span className="font-bold text-[#1f2937]">{label}</span>
      <div className={`${hasIcon ? "relative flex" : ""}`}>
        <input
          type={type}
          placeholder={placeholder}
          required={required}
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
        {hasIcon && (
          <div
            className="absolute top-1/2 right-0 h-full w-[50px] -translate-y-1/2 transform cursor-pointer border-none bg-transparent text-[#979797]"
            onClick={onTogglePassword}
          >
            <i
              className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform`}
            ></i>
          </div>
        )}
      </div>
      {error && (
        <span className="ml-[15px] text-[0.8rem] font-bold text-[#FF585D]">
          {error}
        </span>
      )}
    </div>
  );
}
