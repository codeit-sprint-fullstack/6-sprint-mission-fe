import SignUpForm from "./_components/SignUpForm";
import AuthHeader from "@/components/ui/AuthHeader";

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-[640px] w-full h-full gap-6 md:gap-10 mx-4 mt-6 mb-[179px] md:mx-[53px] md:mt-[48px] md:mb-[243px] lg:mt-[60px]">
        <AuthHeader />
        <SignUpForm />
      </div>
    </>
  );
}
