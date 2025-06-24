export default function Popup({
  message,
  onClose,
  isOpen = false,
}: {
  message: string;
  onClose: () => void;
  isOpen: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50 px-4">
      <div className="flex h-[220px] w-full max-w-[400px] flex-col items-center justify-center gap-6 rounded-[8px] bg-white p-6 md:h-[250px] md:w-[520px] md:max-w-none">
        <span className="flex h-[60%] w-full items-center justify-center pt-6 text-[1rem] text-[#1f2937]">
          {message}
        </span>
        <button
          className="h-[48px] w-[120px] cursor-pointer rounded-[8px] border-none bg-[#FF585D] text-white transition-colors duration-300 hover:bg-[#FF7A7E] md:self-end"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}
