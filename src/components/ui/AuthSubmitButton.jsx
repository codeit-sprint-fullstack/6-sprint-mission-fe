export default function AuthSubmitButton({
  label = "",
  isDisabled = true,
  className = "",
  ...props
}) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`w-full h-14 rounded-[40px] text-white text-xl font-semibold leading-[32px] cursor-pointer ${
        isDisabled ? "bg-secondary-400 cursor-not-allowed" : "bg-primary"
      } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
