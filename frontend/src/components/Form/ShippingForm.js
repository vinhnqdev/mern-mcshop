import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import InputField from "../FormField/InputField";
import Button from "../UI/Button";

const schema = yup.object().shape({
  address: yup.string().required("Địa chỉ là bắt buộc"),
  city: yup.string().required("Thành phố là bắt buộc"),
  postalCode: yup.string().required("Postal Code là bắt buộc"),
  country: yup.string().required("Vui lòng chọn đất nước"),
});

function ShippingForm({ initialValues, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const submitHandler = (shippingAddress) => {
    onSubmit(shippingAddress);
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-5">Địa chỉ</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <InputField name="address" control={control} label="Địa chỉ của bạn *" />

        <InputField name="city" control={control} label="Nhập thành phố *" />

        <InputField name="postalCode" control={control} label="Postal Code *" />

        <InputField name="country" control={control} label="Đất nước *" />

        <div className="flex items-center justify-center">
          <Button type="submit">Tiếp tục</Button>
        </div>
      </form>
    </div>
  );
}

export default ShippingForm;
