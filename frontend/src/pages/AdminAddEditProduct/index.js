import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProductDetail } from "app/productDetailSlice";
import { addProduct, updateProduct } from "app/productThunk";
import AddEditProductForm from "./components/AddEditProductForm";
function AddEditProductPage() {
  const { id } = useParams();
  const isEditMode = id !== "add";
  const dispatch = useDispatch();
  const history = useHistory();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode) {
        try {
          const actionResult = await dispatch(getProductDetail(id));
          const {
            name,
            price,
            images,
            descriptions,
            brand,
            category,
            countInStock,
            guaranteeNum,
            discount,
          } = await unwrapResult(actionResult);
          setProductDetails({
            name,
            price,
            images,
            descriptions,
            brand,
            category,
            countInStock,
            guaranteeNum,
            discount,
          });
        } catch (error) {}
      }
    };
    fetchData();
  }, [dispatch, isEditMode, id]);

  const handleAddEditProduct = async (product) => {
    if (isEditMode) {
      try {
        const actionResult = await dispatch(
          updateProduct({
            product,
            id,
          })
        );
        await unwrapResult(actionResult);
        message.success({
          content: "Cập nhật sản phẩm thành công",
          icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
          className: "custom-message custom-message-success",
        });
        history.push("/admin/product-list");
      } catch (error) {
        message.error({
          content: error.message,
          icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
          className: "custom-message custom-message-error",
        });
      }
    } else {
      try {
        const actionResult = await dispatch(addProduct(product));
        await unwrapResult(actionResult);
        message.success({
          content: "Thêm sản phẩm thành công",
          icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
          className: "custom-message custom-message-success",
        });
        history.push("/admin/product-list");
      } catch (error) {
        console.log(error);
        message.error({
          content: error.message,
          icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
          className: "custom-message custom-message-error",
        });
      }
    }
  };

  const initialValues = {
    name: "",
    price: "",
    images: [],
    descriptions: [],
    countInStock: 0,
    guaranteeNum: 0,
    discount: 0,
    ...productDetails,
    brand: productDetails?.brand._id || "",
    category: productDetails?.category._id || "",
  };

  return (
    <section>
      {(!isEditMode || productDetails) && (
        <AddEditProductForm
          onSubmit={handleAddEditProduct}
          initialValues={initialValues}
          productId={id}
        />
      )}
    </section>
  );
}

export default AddEditProductPage;
