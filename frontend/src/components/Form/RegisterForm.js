import React from "react";
import InputField from "../FormField/InputField";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";
import Loading from "../UI/Loading";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc").max(20, "Tên phải ngắn hơn 20 kí tự"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu quá ngắn, tối thiểu có 8 kí tự"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
});

function RegisterForm({ initialValues, onSubmit }) {
  const history = useHistory();
  const { loading } = useSelector((state) => state.user);

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const submitHandler = (user) => {
    onSubmit(user);
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-5">Đăng kí</h2>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <InputField name="name" control={control} label="Tên của bạn *" />

        <InputField name="email" control={control} label="Email của bạn *" />

        <InputField type="password" name="password" control={control} label="Mật khẩu *" />

        <InputField
          type="password"
          name="confirmPassword"
          control={control}
          label="Xác nhận mật khẩu *"
        />

        <div className="flex items-center justify-between">
          <Button type="button" onClick={() => history.push("/login")}>
            Đăng nhập
          </Button>
          <Button type="submit" disabled={loading}>
            Đăng kí
          </Button>
        </div>
        <div className="text-right underline pr-2">
          <Link to="/forgot-password">Quên mật khẩu</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
