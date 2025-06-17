import React from "react";
import LoginForm from "../_components/LoginForm";
import AuthContainer from "../_components/AuthContainer";
import AuthFooter from "../_components/AuthFooter";

function LoginPage() {
  return (
    <>
      <AuthContainer>
        <LoginForm />
        <AuthFooter />
      </AuthContainer>
    </>
  );
}

export default LoginPage;
