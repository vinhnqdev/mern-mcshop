import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  selectDistrictOptions,
  selectProviceOptions,
  selectWardsOptions,
} from "../../app/citySlice";
import { getDistricts, getProvices, getWards } from "../../app/cityThunk";
import CheckBoxField from "../FormField/CheckboxField";
import InputField from "../FormField/InputField";
import RadioField from "../FormField/RadioField";
import SelectField from "../FormField/SelectField";
import TextAreaField from "../FormField/TextAreaField";
import Button from "../UI/Button";

const schema = yup.object().shape({
  name: yup.string().required("Tên là bắc buộc"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  city: yup.string().required("Vui lòng chọn tỉnh, thành phố"),
  district: yup.string().required("Vui lòng chọn quận, huyện"),
  ward: yup.string().required("Vui lòng chọn phường, xã"),
  address: yup.string().required("Vui lòng chọn địa chỉ"),
  typeOfAddress: yup.string().required("Vui lòng chọn loại địa chỉ"),
});

function ShippingForm({ initialValues, onSubmit }) {
  const dispatch = useDispatch();
  const proviceOptions = useSelector(selectProviceOptions);
  const districtOptions = useSelector(selectDistrictOptions);
  const wardOptions = useSelector(selectWardsOptions);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getProvices());
  }, [dispatch]);

  const watchCity = watch("city");
  const watchDistrict = watch("district");
  useEffect(() => {
    if (watchCity) {
      dispatch(
        getDistricts({
          code: watchCity,
          query: {
            depth: 2,
          },
        })
      );
    }
    if (watchDistrict) {
      dispatch(
        getWards({
          code: watchDistrict,
          query: {
            depth: 2,
          },
        })
      );
    }
  }, [dispatch, watchCity, watchDistrict]);

  const submitHandler = (shippingAddress) => {
    onSubmit(shippingAddress);
  };

  const typeOfAddressData = [
    {
      label: "Nhà riêng / Chung cư",
      value: "HOME",
    },
    {
      label: "Cơ quan / Công ty",
      value: "COM",
    },
  ];

  const defaultAddressData = [{ value: true, label: "Sử dụng địa chỉ này làm mặc định" }];

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-5">Địa chỉ</h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <InputField name="name" control={control} label="Tên của bạn *" />

        <InputField name="phone" control={control} label="Số điện thoại của bạn *" />

        <SelectField
          name="city"
          control={control}
          optionsArray={proviceOptions}
          label="Tỉnh/Thành phố"
        />

        <SelectField
          name="district"
          control={control}
          optionsArray={districtOptions}
          label="Quận/Huyện"
        />

        <SelectField name="ward" control={control} optionsArray={wardOptions} label="Phường/Xã" />

        <TextAreaField
          name="address"
          control={control}
          label="Địa chỉ"
          placeholder="Ví dụ: 100 Võ Thị Sáu"
        />

        <RadioField
          name="typeOfAddress"
          control={control}
          radioArray={typeOfAddressData}
          label="Loại địa chỉ"
        />

        <CheckBoxField
          name="isDefault"
          control={control}
          checkboxArray={defaultAddressData}
          labelId="default-address"
        />

        <div className="flex items-center justify-center">
          <Button
            className="mc_button mc_button--secondary mc_button--pos-tl mc_button--round-sm px-6 py-2"
            type="submit"
          >
            Tiếp tục
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ShippingForm;
