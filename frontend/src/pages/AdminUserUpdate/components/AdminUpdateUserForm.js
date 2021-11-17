import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import CheckBoxField from "components/FormField/CheckboxField";
import InputField from "components/FormField/InputField";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc").max(20, "Tên phải ngắn hơn 20 kí tự"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});

function AdminUpdateUserForm({ initialValues, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const submitHandler = (updateUser) => {
    onSubmit(updateUser);
  };

  const defaultAddressData = [{ value: true, label: "Admin" }];

  return (
    <div className="max-w-xl mx-auto">
      <form className="space-y-5">
        <InputField name="name" control={control} label="Tên của bạn *" />
        <InputField name="email" control={control} label="Email của bạn *" />
        <CheckBoxField
          name="isAdmin"
          control={control}
          checkboxArray={defaultAddressData}
          labelId="default-address"
        />
        <div>
          <Button type="primary" block size="large" onClick={handleSubmit(submitHandler)}>
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminUpdateUserForm;
