import React from "react";
import InputField from "../FormField/InputField";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu quá ngắn, tối thiểu có 8 kí tự"),
});

function LoginForm({ initialValues, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const submitHandler = (user) => {
    onSubmit(user);
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <InputField name="email" control={control} label="Tên tài khoản hoặc địa chỉ email *" />

        <InputField type="password" name="password" control={control} label="Mật khẩu" />

        <Button type="submit">Đăng nhập</Button>
      </form>
    </div>
  );
}

export default LoginForm;
