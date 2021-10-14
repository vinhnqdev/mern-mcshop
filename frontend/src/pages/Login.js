import React from "react";
import LoginForm from "../components/Form/LoginForm";

function Login() {
  const handleSubmit = (user) => {
    console.log(user);
  };

  const initialForm = {
    email: "",
    password: "",
  };

  return (
    <div>
      <LoginForm initialValues={initialForm} onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
