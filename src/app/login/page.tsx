import Logo from "@/components/Logo";
import SignForm from "@/components/SignForm";
import SimpleLogin from "@/components/SimpleLogin";

export default async function LoginPage() {
  return (
    <div className="w-full px-4 flex flex-col items-center py-6 gap-6 mt-20">
      <Logo />
      <SignForm isSignup={false} />
      <SimpleLogin />

      <div className="flex">
        <p>판다마켓이 처음이신가요? </p>
        <a href="/signin" className="text-primary-200 underline ml-1">
          회원가입
        </a>
      </div>
    </div>
  );
}
