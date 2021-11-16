import React from "react";
import LoginForm from "../components/Form/LoginForm";
import { useDispatch } from "react-redux";
import { login } from "../app/userThunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import queryString from "query-string";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { redirect } = queryString.parse(location.search);

  const handleSubmit = async (user) => {
    try {
      const actionResult = await dispatch(login(user));
      await unwrapResult(actionResult);
      history.push(redirect ? `/${redirect}` : "");
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
