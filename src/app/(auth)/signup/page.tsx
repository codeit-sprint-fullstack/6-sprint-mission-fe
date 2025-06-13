"use server";

import React from "react";
import AuthContainer from "../_components/AuthContainer";
import SignupForm from "../_components/SignupForm";

function SignupPage() {
  return (
    <>
      <AuthContainer>
        <SignupForm />
      </AuthContainer>
    </>
  );
}

export default SignupPage;
