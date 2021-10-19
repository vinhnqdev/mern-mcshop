import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addUserAddress, getUserAddresses } from "../app/userThunk";
import ShippingForm from "../components/Form/ShippingForm";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import UserAddressList from "../components/Checkout/UserAddressList";
function CheckoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formIsShown, setFormIsShow] = useState(false);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleShippingSubmit = async (shippingAddress) => {
    console.log(shippingAddress);

    try {
      const actionResult = await dispatch(addUserAddress(shippingAddress));
      await unwrapResult(actionResult);

      history.push("/checkout/placeorder");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShowForm = () => {
    setFormIsShow((preState) => !preState);
  };

  const initialValues = {
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    typeOfAddress: "HOME",
    isDefault: true,
  };

  return (
    <div>
      <div className="space-y-3">
        <p className="font-bold md:text-lg">Địa chỉ giao hàng</p>
        <p className="font-semibold text-sm md:text-base">Chọn địa chỉ giao hàng có sẵn bên dưới</p>
        <UserAddressList />
        <p className="cursor-pointer text-blue-600 text-sm" onClick={handleShowForm}>
          Thêm địa chỉ giao hàng mới
        </p>
      </div>
      {formIsShown && (
        <ShippingForm initialValues={initialValues} onSubmit={handleShippingSubmit} />
      )}
    </div>
  );
}

export default CheckoutPage;
