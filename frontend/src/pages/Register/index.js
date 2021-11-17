import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "app/userThunk";
import RegisterForm from "./components/RegisterForm";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async ({ name, email, password }) => {
    try {
      const actionResult = await dispatch(register({ name, email, password }));
      const currentUser = unwrapResult(actionResult);
      if (currentUser.token) {
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div>
      <RegisterForm initialValues={initialForm} onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
