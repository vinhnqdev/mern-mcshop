import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "app/userThunk";
import RegisterForm from "./components/RegisterForm";
import { useHistory } from "react-router";
import { message } from "antd";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async ({ name, email, password }) => {
    try {
      const actionResult = await dispatch(register({ name, email, password }));
      const currentUser = await unwrapResult(actionResult);
      if (currentUser.token) {
        history.push("/");
      }
      message.success({
        content: "Đăng kí thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
    } catch (error) {
      message.error({
        content: error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
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
