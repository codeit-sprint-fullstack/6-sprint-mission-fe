export default function SubmitButton({
  isValid,
  type,
}: {
  isValid: boolean;
  type: "로그인" | "회원가입";
}) {
  return (
    <button
      type="submit"
      disabled={!isValid}
      className="btn-base h-[56px] w-full rounded-[40px] text-xl font-semibold"
    >
      {type}
    </button>
  );
}
