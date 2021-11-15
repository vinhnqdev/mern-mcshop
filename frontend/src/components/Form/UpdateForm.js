import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import InputField from "../FormField/InputField";
import Button from "../UI/Button";
import Loading from "../UI/Loading";

const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc").max(20, "Tên phải ngắn hơn 20 kí tự"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu quá ngắn, tối thiểu có 8 kí tự"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
});

function UpdateForm({ initialValues, onSubmit }) {
  const { loading } = useSelector((state) => state.user);

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const submitHandler = ({ name, email, password }) => {
    onSubmit({
      name,
      email,
      password,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-5">Cập nhật thông tin</h2>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <InputField name="name" control={control} label="Tên của bạn *" />

        <InputField name="email" control={control} label="Email của bạn *" />

        <InputField type="password" name="password" control={control} label="Mật khẩu mới *" />

        <InputField
          type="password"
          name="confirmPassword"
          control={control}
          label="Xác nhận mật khẩu *"
        />

        <div className="flex items-center justify-center">
          <Button
            className="mc_button mc_button--secondary mc_button--pos-tl mc_button--round-sm mc_button--uppercase px-6 py-2 font-semibold"
            type="submit"
            disabled={loading}
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
