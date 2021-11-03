import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addUserAddress, getUserAddresses } from "../app/userThunk";
import ShippingForm from "../components/Form/ShippingForm";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import UserAddressList from "../components/Checkout/UserAddressList";
import Loading from "../components/UI/Loading";
import addressApi from "../api/addressApi";
import { Button, message } from "antd";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import Modal from "../components/UI/Modal";
function ShippingPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formIsShown, setFormIsShow] = useState(false);

  const userAddresses = useSelector((state) => state.user.userAddresses);
  const loading = useSelector((state) => state.user.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editAddressId, setEditAddressId] = useState();
  const [removeAddressId, setRemoveAddressId] = useState();

  const isEditMode = !!editAddressId;
  const editAddress = userAddresses.find((add) => add._id === editAddressId) || {};

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch, editAddressId]);

  const handleShippingSubmit = async (shippingAddress) => {
    if (isEditMode) {
      try {
        await addressApi.myUpdateById(shippingAddress, editAddressId);

        setEditAddressId();
        setFormIsShow(false);
        message.success({
          content: "Cập nhật địa chỉ thành công",
          icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
          className: "custom-message custom-message-success",
        });
      } catch (error) {
        message.error({
          content: error.response.data.message || error.message,
          icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
          className: "custom-message custom-message-error",
        });
      }
    } else {
      try {
        const actionResult = await dispatch(addUserAddress(shippingAddress));
        await unwrapResult(actionResult);

        history.push("/checkout/placeorder");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleOpenModal = (id) => {
    setIsModalVisible(true);
    setRemoveAddressId(id);
  };

  const handleDropAddress = async () => {
    try {
      await addressApi.myDeleteById(removeAddressId);
      setIsModalVisible(false);
      message.success({
        content: "Xoá thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
      dispatch(getUserAddresses());
    } catch (error) {
      message.error({
        content: error.response.data.message || error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
    }
  };

  const handleShowForm = () => {
    if (formIsShown) {
      setEditAddressId();
    }
    setFormIsShow((preState) => !preState);
  };

  const handleEditAddress = (_id) => {
    setFormIsShow(true);
    setEditAddressId(_id);
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
    ...editAddress,
  };

  return (
    <div>
      <div>
        {userAddresses.length !== 0 && (
          <>
            <p className="font-semibold text-lg">Địa chỉ giao hàng</p>
            <p className="text-sm md:text-base">Chọn địa chỉ giao hàng có sẵn bên dưới</p>
            <UserAddressList
              // loading={loading}
              userAddresses={userAddresses}
              onEdit={handleEditAddress}
              onRemove={handleOpenModal}
            />
          </>
        )}
        <div className="sm:text-center text-sm mt-5 md:mt-10">
          {userAddresses.length === 0 && <span>Bạn chưa có địa chỉ nào. </span>}
          <span className="cursor-pointer inline-block text-blue-700" onClick={handleShowForm}>
            Thêm địa chỉ giao hàng mới
          </span>
        </div>
      </div>
      {loading && <Loading />}
      {((formIsShown && !isEditMode) || (formIsShown && isEditMode && !loading)) && (
        <ShippingForm initialValues={initialValues} onSubmit={handleShippingSubmit} />
      )}

      {isModalVisible && (
        <Modal onClose={() => setIsModalVisible(false)}>
          <p className="">Bạn muốn xoá sản phẩm này?</p>
          <div className="flex justify-end gap-4">
            <Button type="ghost" onClick={() => setIsModalVisible(false)}>
              Không
            </Button>
            <Button type="primary" danger onClick={handleDropAddress}>
              Xoá
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ShippingPage;
