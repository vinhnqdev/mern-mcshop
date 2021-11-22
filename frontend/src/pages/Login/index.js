import React from "react";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import { login } from "app/userThunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { message } from "antd";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { redirect } = queryString.parse(location.search);

  const handleSubmit = async (user) => {
    try {
      const actionResult = await dispatch(login(user));
      await unwrapResult(actionResult);
      message.success({
        content: "Đăng nhập thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
      history.push(redirect ? `/${redirect}` : "");
    } catch (error) {
      message.error({
        content: error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
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
