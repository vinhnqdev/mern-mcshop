import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import InputField from "../FormField/InputField";
import * as yup from "yup";
import TextAreaField from "../FormField/TextAreaField";
import SelectField from "../FormField/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { selectBrandOptions } from "../../app/brandSlice";
import { getBrandList } from "../../app/brandThunk";
import { getCategoryList } from "../../app/categoryThunk";
import { selectCategoryOptions } from "../../app/categorySlice";
import axios from "axios";
import Loading from "../UI/Loading";
import { XIcon } from "@heroicons/react/solid";
import { updateProduct } from "../../app/productThunk";
import { unwrapResult } from "@reduxjs/toolkit";

const formatCurrencyInput = (inputNum) => {
  return inputNum
    .toString()
    .split("")
    .reverse()
    .map((x, ind) => {
      if (ind % 3 === 0 && ind !== 0) {
        return `${x},`;
      }
      return x;
    })
    .reverse()
    .join("");
};
const schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc").max(30, "Tên phải ngắn hơn 20 kí tự"),
});

function AddEditProductForm({ initialValues, onSubmit, productId }) {
  const [images, setImages] = useState(initialValues.images);
  const [uploading, setUploading] = useState(false);
  const [price, setPrice] = useState(formatCurrencyInput(initialValues.price));

  const brandOption = useSelector(selectBrandOptions);
  const categoryOption = useSelector(selectCategoryOptions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrandList());
    dispatch(getCategoryList());
  }, [dispatch]);

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const submitHandler = (products) => {
    onSubmit({
      ...products,
      images,
      price: Number(price.split(",").join("")),
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImages([...images, data]);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleDeleteFile = async (index) => {
    const imagesClone = [...images];

    imagesClone.splice(index, 1);

    try {
      const actionResult = await dispatch(
        updateProduct({
          product: {
            images: imagesClone,
          },
          id: productId,
        })
      );
      await unwrapResult(actionResult);
      setImages(imagesClone);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputCurrencyChange = (e) => {
    const price = e.target.value.split(",").join("");
    setPrice(formatCurrencyInput(price));
  };

  return (
    <div className="max-w-xl mx-auto">
      <form className="space-y-5">
        <InputField name="name" control={control} label="Tên sản phẩm *" />

        <div>
          <label htmlFor="">Giá *</label>
          <div className="relative">
            <input
              type="text"
              value={price}
              className="w-full border border-gray-400 text-md py-2 px-5 absolute"
              onChange={handleInputCurrencyChange}
            />
            <span className="absolute top-2 left-2">&#8363;</span>
          </div>
        </div>

        <div>
          <label htmlFor="product-file-input" className="block mb-2">
            Chọn hình ảnh
          </label>
          <input type="file" id="product-file-input" onChange={uploadFileHandler} />
          {uploading && <Loading />}
          <ul className="flex items-center space-x-4 mt-5">
            {images.map((image, index) => (
              <li className="w-24 h-24 relative" key={image}>
                <XIcon
                  onClick={() => handleDeleteFile(index)}
                  className="w-5 h-5 absolute -top-2 -right-2 cursor-pointer text-gray-600"
                />
                <img src={image} alt="" className="w-full h-full" />
              </li>
            ))}
          </ul>
        </div>

        <TextAreaField name="description" control={control} label="Mô tả" />
        <SelectField
          name="brand"
          control={control}
          label="Thương hiệu"
          optionsArray={brandOption}
        />
        <SelectField name="category" control={control} label="Loại" optionsArray={categoryOption} />

        <InputField
          name="countInStock"
          type="number"
          control={control}
          label="Số lượng trong kho *"
        />
        <InputField
          name="guaranteeNum"
          type="number"
          control={control}
          label="Bảo hành (tháng) *"
        />

        <InputField name="discount" type="number" control={control} label="Giảm giá (%) *" />

        <div>
          <Button type="primary" block size="large" onClick={handleSubmit(submitHandler)}>
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddEditProductForm;
