export default function SubmitButton({
  isFormValid,
}: {
  isFormValid: string | boolean;
}) {
  return (
    <button
      type="submit"
      className={`h-[56px] rounded-[40px] text-[1.2rem] ${
        isFormValid
          ? "cursor-pointer bg-[#3692FF] text-[#f3f4f6]"
          : "cursor-not-allowed bg-[#9ca3af] text-[#f3f4f6]"
      } mt-2 transition-colors duration-300`}
      disabled={!isFormValid}
    >
      회원가입
    </button>
  );
}
