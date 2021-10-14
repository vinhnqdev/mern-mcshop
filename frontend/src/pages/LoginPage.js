import React from "react";
import LoginForm from "../components/Form/LoginForm";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (user) => {
    try {
      const actionResult = await dispatch(login(user));
      const currentUser = unwrapResult(actionResult);
      if (currentUser.token) {
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
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
