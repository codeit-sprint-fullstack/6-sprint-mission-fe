"use client";

import AuthContainer from "../_components/AuthContainer";
import LogoSection from "../_components/LogoSection";
import SignUpForm from "./_components/SignUpForm";

export default function SignUp() {
  return (
    <AuthContainer>
      <LogoSection />
      <SignUpForm />
    </AuthContainer>
  );
}
