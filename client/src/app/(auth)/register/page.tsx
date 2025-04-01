import React from "react";
import RegisterForm from "./register-form";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-5">Register Page</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
