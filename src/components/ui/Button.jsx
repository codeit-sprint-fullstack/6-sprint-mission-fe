export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg py-[11.5px] px-[23px] bg-primary hover:bg-primary-200 focus:bg-primary-300 text-white font-semibold w-[88px] h-[42px] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
