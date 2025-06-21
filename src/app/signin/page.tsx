import Logo from "@/components/Logo";
import SignForm from "@/components/SignForm";
import SimpleLogin from "@/components/SimpleLogin";

export default async function SignInPage() {
  return (
    <div className="w-full px-4 flex flex-col items-center py-6 gap-6 mt-20">
      <Logo />
      <SignForm isSignup={true} />
      <SimpleLogin />

      <div className="flex">
        <p>이미 회원이신가요?</p>
        <a href="/login" className="text-primary-200 underline ml-1">
          로그인
        </a>
      </div>
    </div>
  );
}
