import React from "react";
import InputField from "components/FormField/InputField";
import { useForm } from "react-hook-form";
import Button from "components/UI/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useHistory } from "react-router-dom";
import Loading from "components/UI/Loading";
import { useSelector } from "react-redux";
const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu quá ngắn, tối thiểu có 8 kí tự"),
});

function LoginForm({ initialValues, onSubmit }) {
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
    <div className="max-w-xl mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-5">Đăng nhập</h2>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <InputField name="email" control={control} label="Tên tài khoản hoặc địa chỉ email *" />

        <InputField type="password" name="password" control={control} label="Mật khẩu *" />

        <div className="flex items-center justify-between">
          <Button
            className="mc_button mc_button--secondary mc_button--pos-tr mc_button--rounded mc_button--uppercase px-6 py-2 text-lg shadow-md font-bold"
            onClick={() => history.push("/register")}
          >
            Đăng kí
          </Button>
          <Button
            className="mc_button mc_button--secondary mc_button--pos-tr mc_button--rounded mc_button--uppercase px-6 py-2 text-lg shadow-md font-bold"
            type="submit"
            disabled={loading}
          >
            Đăng nhập
          </Button>
        </div>
        <div className="text-right underline pr-2 ">
          <Link to="/forgot-password" className="text-black">
            Quên mật khẩu
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
