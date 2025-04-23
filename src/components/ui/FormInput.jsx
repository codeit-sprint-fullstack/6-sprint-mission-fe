export default function FormInput({
  label,
  placeholder,
  type = "text",
  id,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col w-full gap-2 md:gap-4">
      {label && (
        <label
          htmlFor={id}
          className="font-bold text-sm md:text-lg text-secondary-800"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`bg-secondary-100 rounded-[12px] h-14 py-4 px-6 placeholder:text-secondary-400 ${className}`}
        {...props}
      />
    </div>
  );
}
