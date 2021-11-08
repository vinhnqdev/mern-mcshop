import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getUserAddresses } from "../../app/userThunk";
import UserAddressList from "../Checkout/UserAddressList";
import Modal from "../UI/Modal";
import { Button, message } from "antd";
import addressApi from "../../api/addressApi";
import { CheckCircleIcon, PlusIcon, XCircleIcon } from "@heroicons/react/solid";
function AddressNotes() {
  const userAddresses = useSelector((state) => state.user.userAddresses);
  const dispatch = useDispatch();
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const loading = useSelector((state) => state.user.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addressId, setAddressId] = useState();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handelModalOpen = (id) => {
    setIsModalVisible(true);
    setAddressId(id);
  };

  const handleDropAddress = async () => {
    try {
      await addressApi.myDeleteById(addressId);
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

  return (
    <div>
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
      <Button
        style={{
          color: "#000",
          fontSize: 13,
          fontWeight: 400,
          display: "flex",
          gap: "6px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
        }}
        type="primary"
        size="large"
        onClick={() => history.push(`${routeMatch.path}/add`)}
      >
        <PlusIcon className="w-5" />
        Thêm địa chỉ giao hàng mới
      </Button>
      <UserAddressList
        onRemove={handelModalOpen}
        loading={loading}
        userAddresses={userAddresses}
        isAddressBook
        redirectAction
      />
    </div>
  );
}

export default AddressNotes;
