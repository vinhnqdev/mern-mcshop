import { Button, Tag } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { userActions } from "../../app/userSlice";
import Loading from "../UI/Loading";

function UserAddressList({
  loading,
  userAddresses,
  isAddressBook,
  onRemove,
  onEdit,
  redirectAction,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();

  const handleShippingAddress = (_id) => {
    const address = userAddresses.find((address) => address._id === _id);
    if (!address) return;
    dispatch(
      userActions.updateAddress({
        address: address.userAddress,
        phone: address.phone,
        name: address.name,
        _id: address._id,
      })
    );
    history.push("/checkout/placeorder");
  };

  if (loading) {
    return <Loading />;
  }

  if (userAddresses.length === 0) {
    return <p>Bạn chưa có địa chỉ nào</p>;
  }

  return (
    <>
      <ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {userAddresses.map(({ _id, name, phone, userAddress, isDefault }) => (
          <li key={_id} className={`p-4 bg-white shadow-md rounded-md`}>
            <div className="flex items-center justify-between">
              <h5 className="font-semibold">{name}</h5>
              {isDefault && <Tag color="#000">Mặc định</Tag>}
            </div>
            <p className="text-sm">{userAddress}</p>
            <p className="text-sm">Điện thoại: {phone}</p>

            <div className="space-x-3 mt-2">
              {!isAddressBook && (
                <button
                  className={`text-sm text-white border border-transparent rounded-sm py-1 px-3 ${
                    isDefault ? "bg-yellow-400" : "bg-gray-600"
                  }`}
                  onClick={() => handleShippingAddress(_id)}
                >
                  Giao đến địa chỉ này
                </button>
              )}

              <Button
                type="ghost"
                onClick={
                  redirectAction
                    ? () => history.push(`${routeMatch.path}/${_id}`)
                    : () => onEdit(_id)
                }
              >
                Sửa
              </Button>
              {!isDefault && (
                <Button danger onClick={() => onRemove(_id)}>
                  Xoá
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserAddressList;
