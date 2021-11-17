import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getUserAddresses } from "app/userThunk";
import { UserAddressList } from "components/Common";
import Modal from "components/UI/Modal";
import { Button, message } from "antd";
import addressApi from "api/addressApi";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { PlusCircleOutlined } from "@ant-design/icons";
import MCButton from "components/UI/Button";
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
      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
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

      {!loading && (
        <MCButton
          onClick={() => history.push(`${routeMatch.path}/add`)}
          className="mc_button mc_button--primary mc_button--pos-tl mc_button--round-sm px-4 py-2 text-sm flex items-center"
        >
          <PlusCircleOutlined style={{ marginRight: "5px", fontSize: 16 }} />
          Thêm địa chỉ giao hàng mới
        </MCButton>
      )}

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
