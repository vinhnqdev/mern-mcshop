import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import addressApi from "../../api/addressApi";
import { addUserAddress } from "../../app/userThunk";

import ShippingForm from "../Form/ShippingForm";
import Loading from "../UI/Loading";

function AddEditAddress() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const isEditMode = id !== "add";

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { data: address } = await addressApi.myAdressById(id);
        setAddress(address);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    if (isEditMode) {
      setLoading(true);
      fetchAddress();
    }
  }, [dispatch, isEditMode, id]);

  const handleAddEditAddress = async (address) => {
    if (isEditMode) {
      try {
        await addressApi.myUpdateById(address, id);
        message.success({
          content: "Cập nhật địa chỉ thành công",
          icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
          className: "custom-message custom-message-success",
        });
        history.push("/profile/address");
      } catch (error) {
        message.error({
          content: error.response.data.message || error.message,
          icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
          className: "custom-message custom-message-error",
        });
      }
    } else {
      try {
        await dispatch(addUserAddress(address));
        message.success({
          content: "Thêm địa chỉ thành công",
          icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
          className: "custom-message custom-message-success",
        });
        history.push("/profile/address");
      } catch (error) {
        message.error({
          content: error.response.data.message || error.message,
          icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
          className: "custom-message custom-message-error",
        });
      }
    }
  };

  const initialAddressValue = {
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
    typeOfAddress: "HOME",
    isDefault: true,
    ...address,
  };

  return (
    <>
      {loading && <Loading />}
      {(!isEditMode || address) && (
        <ShippingForm onSubmit={handleAddEditAddress} initialValues={initialAddressValue} />
      )}
    </>
  );
}

export default AddEditAddress;
