import AuthHeader from "@/components/ui/AuthHeader";
import React from "react";
import LoginForm from "./_components/LoginForm";


export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-[640px] w-full h-full gap-6 md:gap-10 mx-4 mt-20 mb-[179px] md:mx-13 lg:mt-[205px]">
      <AuthHeader />
      <LoginForm />
      
    </div>
  );
}
