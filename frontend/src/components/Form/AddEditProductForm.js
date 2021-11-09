import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import InputField from "../FormField/InputField";
import * as yup from "yup";
import SelectField from "../FormField/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { selectBrandOptions } from "../../app/brandSlice";
import { getBrandList } from "../../app/brandThunk";
import { getCategoryList } from "../../app/categoryThunk";
import { selectCategoryOptions } from "../../app/categorySlice";
import axios from "axios";
import Loading from "../UI/Loading";
import { XIcon, PlusIcon } from "@heroicons/react/solid";
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
  name: yup.string().required("* Tên là bắt buộc"),
  descriptions: yup
    .array()
    .min(1, "* Cần ít nhất một mô tả cho sản phẩm")
    .of(
      yup.object().shape({
        description: yup.string().required("* Vui lòng nhập mô tả cho sản phẩm"),
      })
    ),
  brand: yup.string().required("Lựa chọn thương hiệu sản phẩm"),
  category: yup.string().required("Lựa chọn loại sản phẩm"),
  countInStock: yup.number().integer("Vui lòng nhập số nguyên dương"),
  guaranteeNum: yup.number().min(0, "Vui lòng nhập số tháng dương"),
  discount: yup
    .number()
    .moreThan(-1, "Vui lòng nhập số lớn hơn 0")
    .lessThan(101, "Vui lòng nhấp số nhỏ hơn 100"),
});

function AddEditProductForm({ initialValues, onSubmit, productId }) {
  const inputPriceRef = useRef();
  const [images, setImages] = useState(initialValues.images);
  const [imagesError, setImagesError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [price, setPrice] = useState(formatCurrencyInput(initialValues.price));
  const [priceError, setPriceError] = useState("");

  const brandOption = useSelector(selectBrandOptions);
  const categoryOption = useSelector(selectCategoryOptions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrandList());
    dispatch(getCategoryList());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "descriptions",
  });

  const submitHandler = (products) => {
    const formatPrice = Number(price.split(",").join(""));

    if (isNaN(formatPrice)) {
      setPriceError("Vui lòng nhập số");
      inputPriceRef.current.focus();
      return;
    }
    // Check validate Price
    if (price === "") {
      setPriceError("Giá là băt buộc");
      inputPriceRef.current.focus();
      return;
    }
    if (formatPrice < 0) {
      setPriceError("Vui lòng nhập số nguyên dương");
      inputPriceRef.current.focus();
      return;
    }

    if (images.length === 0) {
      setImagesError("* Chọn ít nhất một hình cho sản phẩm");
      return;
    }

    setPriceError("");

    onSubmit({
      ...products,
      images,
      price: formatPrice,
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

        {/** Price */}
        <div>
          <label htmlFor="price-pruduct">Giá *</label>
          <div className="relative">
            <input
              type="text"
              id="price-pruduct"
              value={price}
              ref={inputPriceRef}
              className="w-full border border-gray-400 text-md py-2 px-5 absolute"
              onChange={handleInputCurrencyChange}
            />
            <span className="absolute top-2 left-2">&#8363;</span>
          </div>
          {<div className="text-sm mt-12 text-red-600">{priceError && `*${priceError}`}</div>}
        </div>

        {/** Image Upload */}

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
          {imagesError && <div className="text-xs text-red-600">{imagesError}</div>}
        </div>

        {/** Descriptions */}
        <div className="space-y-2">
          <label htmlFor="" className="block">
            Descriptions
          </label>
          {fields.length === 0 && (
            <Button
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
              type="primary"
              icon={<PlusIcon className="w-4 h-4 inline-block" />}
              block
              onClick={() => append({})}
            >
              Thêm mô tả
            </Button>
          )}
          {fields.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-x-2">
                <input
                  className="w-full border border-gray-400 text-md p-1"
                  {...register(`descriptions.${index}.description`)}
                />
                <Button type="primary" onClick={() => append({})}>
                  Thêm
                </Button>
                <Button danger onClick={() => remove(index)}>
                  Xoá
                </Button>
              </div>
              {errors.descriptions && (
                <div className="text-xs mt-1 text-red-600">
                  {errors.descriptions[index]?.description.message}
                </div>
              )}
            </div>
          ))}

          {errors.descriptions && (
            <div className="text-xs mt-12 text-red-600">{errors.descriptions.message}</div>
          )}
        </div>

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
