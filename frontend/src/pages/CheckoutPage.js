import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const userAddresses = useSelector((state) => state.user.userAddresses);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleShippingSubmit = async (shippingAddress) => {
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
      <div>
        {userAddresses.length !== 0 && (
          <>
            <p className="font-semibold text-lg">Địa chỉ giao hàng</p>
            <p className="text-sm md:text-base">Chọn địa chỉ giao hàng có sẵn bên dưới</p>
            <UserAddressList />
          </>
        )}
        <div className="sm:text-center text-sm mt-5 md:mt-10">
          {userAddresses.length === 0 && <span>Bạn chưa có địa chỉ nào. </span>}
          <span className="cursor-pointer inline-block text-blue-700" onClick={handleShowForm}>
            Thêm địa chỉ giao hàng mới
          </span>
        </div>
      </div>
      {formIsShown && (
        <ShippingForm initialValues={initialValues} onSubmit={handleShippingSubmit} />
      )}
    </div>
  );
}

export default CheckoutPage;
