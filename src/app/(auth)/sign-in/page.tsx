"use client";

import { SignInForm } from "./_components/SignIntForm";
import LogoSection from "../_components/LogoSection";

import AuthContainer from "../_components/AuthContainer";

export default function SignIn() {
  return (
    <AuthContainer>
      <LogoSection />
      <SignInForm />
    </AuthContainer>
  );
}
