import React from "react";
import SignupForm from "../_components/SignupForm";
import AuthContainer from "../_components/AuthContainer";
import AuthFooter from "../_components/AuthFooter";

function SignupPage() {
  return (
    <>
      <AuthContainer>
        <SignupForm />
        <AuthFooter />
      </AuthContainer>
    </>
  );
}

export default SignupPage;
